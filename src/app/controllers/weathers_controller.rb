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

    # site title
    if doc.css('//meta[property="og:site_name"]/@content').empty?
      @title = p doc.title.to_s
    else
      @title = p doc.css('//meta[property="og:site_name"]/@content').to_s
    end

    # site table recognize
    @tables = []
    # doc.xpath('//table').each do |table|
    #   @tables << { title:  }
    # end
    doc.css('.m-txt-ttl5 span strong').each do |node|
      @tables << { 
        title: node.inner_text
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
