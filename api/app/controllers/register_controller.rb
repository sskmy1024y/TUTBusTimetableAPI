require 'date'
require 'time'
require "json"
require 'nokogiri'
require 'open-uri'

class RegisterController < ApplicationController
  before_action :basic_auth
  protect_from_forgery with: :exception

  def index

  end

  def new
    @url = params[:url]
    return nil if @url.empty?

    charset = nil
    html = open(@url) do |f|
      charset = f.charset # 文字種別を取得
      f.read # htmlを読み込んで変数htmlに渡す
    end

    # ノコギリを使ってhtmlを解析
    doc = Nokogiri::HTML.parse(html, charset)

    # site title
    if doc.css('//meta[property="og:site_name"]/@content').empty?
      @title = p doc.title.to_s
    else
      @title = p doc.css('//meta[property="og:site_name"]/@content').to_s
    end

    # =============================
    #  時刻表の解析
    # =============================
    @tables = []

    contents = doc.css('div.commonDetailBox01')
    html_tables = contents.css('>table')
    html_headers = contents.css('>h6.m-txt-ttl5')

    html_tables.each_with_index do |table_html, index|
      title_html = html_headers.css('span strong')[index]

      # 一時格納するための変数を宣言
      goto_school = []
      goto_destination = []

      # 一行ごとに時間を解析
      # シャトル運行の際、次の時間とそれ以前の時間とを比較して、間隔文をDB挿入する。
      # rowspan = countとする
      is_shuttle = { status: false, interval: 0, count: 0 }

      table_html.css('tr').each do |row|
        if !row.css('td').empty?
          # シャトル運行間隔記載があれば、間隔時間を取得
          ## シャトル運行の記載があるカラムは固定ではないので、全てのカラムで検査する
          shuttle_notice_td = shuttle_notice_cell(row.css('td'))
          if !shuttle_notice_td.nil? && shuttle_notice_td.inner_text =~ /\s*約?(\d*)～(\d*)分\s*/
            interval = shuttle_notice_td.inner_text.split(/\s*約?(\d*)～(\d*)分\s*/)
            rowspan = shuttle_notice_td.attribute("rowspan").value.to_i unless shuttle_notice_td.attribute("rowspan").nil?
            is_shuttle = {
              status: true,
              interval: ([interval[1].to_f, interval[2].to_f].average * 60).round,
              count: rowspan.blank? ? 1 : rowspan.to_i
            }
          # シャトル運行フラグのみがある場合
          elsif !shuttle_notice_td.nil?
            rowspan = shuttle_notice_td.attribute("rowspan").value.to_i unless shuttle_notice_td.attribute("rowspan").nil?
            is_shuttle = {
              status: true,
              interval: 0,
              count: rowspan.blank? ? 1 : rowspan.to_i
            }
          # *** シャトル運行中の間隔情報を元に自動生成 ***
          # シャトル運行フラグがあり、rowspanのカウントが0の場合、シャトル期間直後のバス時刻表から計算を行う
          elsif is_shuttle[:status] && is_shuttle[:count] == 0 && is_shuttle[:interval] > 0 && row.css('td')[0].inner_text != "～"
            # 表記あり時刻に近似しない時刻であることを確認
            while Time.parse(row.css('td')[0].inner_text) > goto_destination.last[:departure_time]+is_shuttle[:interval] * 2
              goto_destination << {
                departure_time: goto_destination.last[:departure_time] + is_shuttle[:interval],
                arrival_time: goto_destination.last[:arrival_time] + is_shuttle[:interval],
                shuttle: true
              }
            end
            while Time.parse(row.css('td')[0].inner_text) > goto_school.last[:departure_time]+is_shuttle[:interval] * 2
              goto_school << {
                departure_time: goto_school.last[:departure_time] + is_shuttle[:interval],
                arrival_time: goto_school.last[:arrival_time] + is_shuttle[:interval],
                shuttle: true
              }
            end

            is_shuttle = { status: false, interval: 0, count: 0 } if is_shuttle[:count] == 0 # 値を初期化
          end

          
          if row.css('td').length > 1 && row.css('td')[0].inner_text != "～"
            goto_destination << {
              departure_time: Time.parse(row.css('td')[0].inner_text),
              arrival_time: Time.parse(row.css('td')[1].inner_text),
              shuttle: is_shuttle[:status]
            } unless row.css('td')[0].inner_text == "" || row.css('td')[1].inner_text == ""
            goto_school << {
              departure_time: Time.parse(row.css('td')[1].inner_text),
              arrival_time: Time.parse(row.css('td')[2].inner_text),
              shuttle: is_shuttle[:status]
            } unless row.css('td')[1].inner_text === "" || row.css('td')[2].inner_text === ""
          end

          if is_shuttle[:status]
            is_shuttle[:count] -= 1 #カウンターを下げる
            is_shuttle = { status: false, interval: 0, count: 0 } if is_shuttle[:count] < 0
          end
        end
      end

      @tables << {
        title: title_html.inner_text,
        destination_place: title_html.inner_text[/(.*)行/, 1],
        school_place: title_html.inner_text[/［発着所：(.*)］/, 1],
        table: {
          to_destination: goto_destination,
          to_school: goto_school
        }
      }
    end


    # 検索方法
    # TimetableSet.find(1).timetables.where("course_id = ? AND departure_time >= ?", [コース情報], Time.now ).limit(3)

    # description
    if doc.css('//meta[property="og:description"]/@content').empty?
      @description = p doc.css('//meta[name$="escription"]/@content').to_s
    else
      @description = p doc.css('//meta[property="og:description"]/@content').to_s
    end
  end

  def create
    tables = JSON.parse(params[:tabledate], symbolize_names: true)
    dates = params[:dates].split(/,\n*/)

    # [TimetableSet情報を設定] ------------------------
    TimetableSet.transaction do
      timetable_set = TimetableSet.create!(name: "とりあえず")

      tables.each do | table |
        # [Course情報を取得・登録] ------------------------
        # Note:表記揺れを修正するための処理が必要
        destination_name = fixed_notation_shaking(table[:destination_place])
        school_name = fixed_notation_shaking(table[:school_place])

        # 目的地のIDを取得
        destination_place = Place.find_by(name: destination_name).id
        # キャンパス側のIDを取得
        school_place = Place.find_by(name: school_name).id
        
        course_to_destination = Course.find_by(arrival_id: destination_place, departure_id: school_place) # 往路      
        course_to_school = Course.find_by(arrival_id: school_place , departure_id: destination_place) # 復路

        # 登録がなければ新規登録
        if course_to_destination.blank?
          course_to_destination = Course.create(arrival_id: destination_place, departure_id: school_place)
        end
        if course_to_school.blank?
          course_to_school = Course.create(arrival_id: school_place , departure_id: destination_place)
        end
        # -----------------------

        Timetable.transaction do

          # 往路の登録
          table[:table][:to_destination].each_with_index do |row, index|
            Timetable.create!(
              timetable_set_id: timetable_set.id,
              course_id: course_to_destination.id,
              departure_time: Time.parse(row[:departure_time]),
              arrival_time: Time.parse(row[:arrival_time]),
              is_shuttle: row[:shuttle],
              is_last: index == table[:table][:to_destination].length - 1
            )
          end
          # 復路
          table[:table][:to_school].each_with_index do |row, index|
            Timetable.create!(
              timetable_set_id: timetable_set.id,
              course_id: course_to_school.id,
              departure_time: Time.parse(row[:departure_time]),
              arrival_time: Time.parse(row[:arrival_time]),
              is_shuttle: row[:shuttle],
              is_last: index == table[:table][:to_school].length - 1
            )
          end
        end
      end

      # [対応する日付情報を登録] --------------------------
      DateSet.transaction do
        dates.each do |date|
          dateset = DateSet.find_by(date: date)
          if dateset.blank?
            DateSet.create!(date: date, timetable_set_id: timetable_set.id)
          else
            dateset.update!(timetable_set_id: timetable_set.id)
          end
        end
      end
    end

    redirect_to "/register"
  end

  def reset

  end

  def timetable_reset
    return render status: 400, json: { status: 400, message: 'Bad Request' } if params[:dates].blank?

    dates = params[:dates].split(/,\n*/)

    DateSet.transaction do
      dates.each do |date|
        dateset = DateSet.find_by(date: date)
        unless dateset.blank?
          dateset.delete
        end
      end
    end

    redirect_to "/register"
  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV.fetch('BASIC_AUTH_NAME', 'admin') && password == ENV.fetch('BASIC_AUTH_PASSWORD', 'root')
    end
  end

  # シャトル運行の記載があるセルを返す関数
  # @params row
  def shuttle_notice_cell(tabledata)
    tabledata.each do |td|
      return td if !td.blank? && td.inner_text.include?('シャトル運行')
    end
    return nil
  end

  # 行先表示の表記揺れを修正する
  # @params string place
  def fixed_notation_shaking(place)
    places = {
      '八王子みなみ野駅' => [
        '八王子みなみ野',
        'みなみ野'
      ],
      '図書館棟前' => [
        '図書館棟',
        '図書館前',
      ],
      '八王子駅南口' => [],
      '厚生棟前' => [
        '厚生棟'
      ],
      '学生会館' => [],
      '正門ロータリー前' => [],
    }

    places.each do | key, value |
      return key if key == place || value.include?(place)
    end

    return nil
  end
end

class Array
  def average
    self.inject(:+) / self.length
  end
end
