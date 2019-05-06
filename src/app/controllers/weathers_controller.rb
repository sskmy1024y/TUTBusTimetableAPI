require 'date'
require 'time'
require 'nokogiri'
require 'open-uri'

class WeathersController < ApplicationController
  def index

  end

  def new
    url = params[:url]

    charset = nil
    html = open(url) do |f|
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
    doc.css('h6.m-txt-ttl5').each do |node|
      table_html = node.css('+table')

      # 一時格納するための変数を宣言
      goto_school = []
      goto_destination = []

      # 一行ごとに時間を解析
      # シャトル運行の際、次の時間とそれ以前の時間とを比較して、間隔文をDB挿入する。
      is_shuttle = { status: false, interval: 0 }

      # [TimetableSet情報を設定] ------------------------
      # TimetableSet.transaction do
        # timetable_set = TimetableSet.create(start_date: DateTime.now)

        # Timetable.transaction do

      table_html.css('tr').each do |row|
        if !row.css('td').empty? 

          # # [Course情報を取得・登録] ------------------------
          # # 目的地のIDを取得
          # destination_place = Place.find_by(name: node.css('span strong').inner_text[/(.*)行/, 1]).id
          # # キャンパス側のIDを取得
          # school_place = Place.find_by(name: node.css('span strong').inner_text[/［発着所：(.*)］/, 1]).id
          
          # # 往路
          # course_to_school = Course.find_by(arrival_id: destination_place, departure_id: school_place)
          # # 復路
          # course_to_destination = Course.find_by(arrival_id: school_place , departure_id: destination_place)

          # if course_to_destination.blank?
          #   course_to_destination = Course.create(arrival_id: school_place , departure_id: destination_place)
          # end
          # if course_to_school.blank?
          #   course_to_school = Course.create(arrival_id: destination_place, departure_id: school_place)
          # end
          # # ------------------------

          

          # シャトル運行間隔記載があれば、間隔時間を取得 
          if !row.css('td')[3].blank? && !row.css('td')[3].inner_text.blank?
            interval = row.css('td')[3].inner_text.split(/\s*約(\d*)～(\d*)分\s*/)
            is_shuttle = {
              status: true,
              interval: ([interval[1].to_f, interval[2].to_f].average * 60).round
            }
          # シャトル運行フラグがあり、次の時間表示の行の場合
          elsif is_shuttle[:status] && row.css('td')[0].inner_text != "～"
            # 表記あり時刻に近似しない時刻であることを確認
            while Time.parse(row.css('td')[0].inner_text) > goto_destination.last[:departure_time]+is_shuttle[:interval] * 2
              goto_destination << {
                departure_time: goto_school.last[:departure_time] + is_shuttle[:interval],
                arrival_time: goto_destination.last[:arrival_time] + is_shuttle[:interval],
                shuttle: true
              }
              goto_school << {
                departure_time: goto_school.last[:departure_time] + is_shuttle[:interval],
                arrival_time: goto_school.last[:arrival_time] + is_shuttle[:interval],
                shuttle: true
              }
              # Timetable.create(
              #   timetable_set_id: timetable_set.id,
              #   course_id: course_to_destination.id,
              #   departure_time: goto_destination.last[:departure_time],
              #   arrival_time: goto_destination.last[:arrival_time],
              #   is_shuttle: true
              # )
              # Timetable.create(
              #   timetable_set_id: timetable_set.id,
              #   course_id: course_to_school.id,
              #   departure_time: goto_school.last[:departure_time],
              #   arrival_time: goto_school.last[:arrival_time],
              #   is_shuttle: true
              # )
            end

            is_shuttle = { status: false, interval: 0 } # 値を初期化
          end

          if row.css('td')[0].inner_text != "～"
            goto_destination << {
              departure_time: Time.parse(row.css('td')[0].inner_text),
              arrival_time: Time.parse(row.css('td')[1].inner_text),
              shuttle: !row.css('td.sbus').blank?
            }
            goto_school << {
              departure_time: Time.parse(row.css('td')[1].inner_text),
              arrival_time: Time.parse(row.css('td')[2].inner_text),
              shuttle: !row.css('td.sbus').blank?
            }
            # Timetable.create(
            #   timetable_set_id: timetable_set.id,
            #   course_id: course_to_destination.id,
            #   departure_time: goto_destination.last[:departure_time],
            #   arrival_time: goto_destination.last[:arrival_time],
            #   is_shuttle: !row.css('td.sbus').blank?
            # )
            # Timetable.create(
            #   timetable_set_id: timetable_set.id,
            #   course_id: course_to_school.id,
            #   departure_time: goto_school.last[:departure_time],
            #   arrival_time: goto_school.last[:arrival_time],
            #   is_shuttle: !row.css('td.sbus').blank?
            # )
          end
        end
      end
        # end
      # end

      @tables << { 
        title: node.css('span strong').inner_text,
        destination_place: node.css('span strong').inner_text[/(.*)行/, 1],
        school_place: node.css('span strong').inner_text[/［発着所：(.*)］/, 1],
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
    
  end
end

class Array
  def average
    self.inject(:+) / self.length
  end
end
