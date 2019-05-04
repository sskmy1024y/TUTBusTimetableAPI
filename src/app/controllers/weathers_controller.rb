require 'time'

class WeathersController < ApplicationController
  def index

  end

  def show  
    require 'nokogiri'
    require 'open-uri'

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

      table_html.css('tr').each do |row|
        if !row.css('td').empty? 

          # シャトル運行間隔記載があれば、間隔時間を取得 
          if !row.css('td')[3].blank? && !row.css('td')[3].inner_text.blank?
            interval = row.css('td')[3].inner_text.split(/\s*約(\d*)～(\d*)分\s*/)
            is_shuttle = {
              status: true,
              interval: ([interval[1].to_f, interval[2].to_f].average * 60).round
            }
        
          # シャトル運行フラグがあって、時間表記がない場合
          elsif is_shuttle[:status] && row.css('td')[0].inner_text != "～"
          
            # 表記あり時刻に近似しない時刻であることを確認
            while Time.parse(row.css('td')[0].inner_text) > goto_destination.last[:departure_time]+is_shuttle[:interval] * 2
              goto_destination << {
                departure_time: goto_destination.last[:departure_time] + is_shuttle[:interval],
                arrival_time: goto_destination.last[:arrival_time] + is_shuttle[:interval],
                suttle: true
              }
              goto_school << {
                departure_time: goto_school.last[:departure_time] + is_shuttle[:interval],
                arrival_time: goto_school.last[:arrival_time] + is_shuttle[:interval],
                suttle: true
              }
            end

            is_shuttle = { status: false, interval: 0 } # 値を初期化
          end

          if row.css('td')[0].inner_text != "～"
            goto_destination << {
              departure_time: Time.parse(row.css('td')[0].inner_text),
              arrival_time: Time.parse(row.css('td')[1].inner_text),
              suttle: false
            }
            goto_school << {
              departure_time: Time.parse(row.css('td')[1].inner_text),
              arrival_time: Time.parse(row.css('td')[2].inner_text),
              suttle: false
            }
          end
        end
      end

      @tables << { 
        title: node.css('span strong').inner_text,
        table: {
          to_description: goto_destination,
          to_school: goto_school
        }
     }
    end

    
    # description
    if doc.css('//meta[property="og:description"]/@content').empty?
      @description = p doc.css('//meta[name$="escription"]/@content').to_s
    else
      @description = p doc.css('//meta[property="og:description"]/@content').to_s
    end
    
    # image
    @image = p doc.css('//meta[property="og:image"]/@content').to_s
          
  end    
end

class Array
  def average
    self.inject(:+) / self.length
  end
end
