require 'nokogiri'
require 'open-uri'
require 'digest/md5'

class Api::V1::CheckController < ApplicationController
  before_action :basic_auth
  protect_from_forgery

  def index
    # url = ENV.fetch('CHECK_TIMETABLE_UPDATE', 'http://www.teu.ac.jp/campus/access/006644.html#bustimetable')
    url = "http://www.teu.ac.jp/campus/access/006644.html"
    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end
    doc = Nokogiri::HTML.parse(html, charset)

    @htmldata = doc.css('.detailBox01.m-txt-ttl5').to_s
    @md5 = Digest::MD5.new.update(@htmldata).to_s

    render json: { success: true, data: @md5 }, status: :ok
  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV.fetch('BASIC_AUTH_NAME', 'admin') && password == ENV.fetch('BASIC_AUTH_PASSWORD', 'root')
    end
  end

end
