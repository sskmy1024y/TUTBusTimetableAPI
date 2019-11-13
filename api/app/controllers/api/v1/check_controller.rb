require 'nokogiri'
require 'open-uri'
require 'digest/md5'

class Api::V1::CheckController < ApplicationController
  before_action :basic_auth
  protect_from_forgery

  def index
    url = ENV.fetch('CHECK_TIMETABLE_UPDATE', '')
    result_internal_error("Could not parse html in nokogiri") if url.empty?

    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end
    doc = Nokogiri::HTML.parse(html, charset)
    result_internal_error("Could not parse html in nokogiri") if doc.blank?

    htmldata = doc.css('.detailBox01.m-txt-ttl5').to_s
    md5 = Digest::MD5.new.update(htmldata).to_s

    last_detect_hash = DetectChangeTimetable.last()&.uuid
    if md5 == last_detect_hash
      return not_detected_update
    else
      last_detect_hash = DetectChangeTimetable.create(
        uuid: md5
      )

      slack_webhook_url = ENV.fetch('WEBHOOK_URL', nil)
      unless slack_webhook_url.nil?
        notifier = Slack::Notifier.new(slack_webhook_url, username: "時刻表更新Bot")
        attachments = {
          color: "#FF8C00",
          pretext: "時刻表掲載ページの更新を検知しました。",
          title: "スクールバス時刻表",
          title_link: "https://www.teu.ac.jp/campus/access/006644.html#bustimetable",
          text: "掲載情報を確認して、更新内容に応じて時刻表を登録してください。",
          fields: [
            {
              title: "Detection Hash",
              value: last_detect_hash.uuid
            }
          ],
          footer: "Detection Bot",
          footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
          ts: last_detect_hash.created_at.to_i
        }
        notifier.post attachments: [attachments]
      end

      render json: { success: true, data: last_detect_hash.uuid }, status: :ok
    end
  end

  private

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV.fetch('BASIC_AUTH_NAME', 'admin') && password == ENV.fetch('BASIC_AUTH_PASSWORD', 'root')
    end
  end

  def result_internal_error(error_str)
    render json: { success: false, data: error_str }, status: :internal
  end

  def not_detected_update
    render json: { success: true, data: "not detectted update" }, status: :no_content
  end

end
