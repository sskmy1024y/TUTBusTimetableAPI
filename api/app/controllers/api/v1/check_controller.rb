require 'nokogiri'
require 'open-uri'
require 'digest/md5'

class Api::V1::CheckController < ApplicationController
  before_action :basic_auth
  protect_from_forgery

  HOST_URL = 'http://www.teu.ac.jp'

  def index
    url = ENV.fetch('CHECK_TIMETABLE_URL', '')
    result_internal_error("Could not parse html in nokogiri") if url.empty?

    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end
    doc = Nokogiri::HTML.parse(html, charset)
    result_internal_error("Could not parse html in nokogiri") if doc.blank?

    container = doc.css('.accessstyle')
    md5 = Digest::MD5.new.update(container.to_s).to_s

    last_detect_data = DetectChangeTimetable.last()
    if md5 != last_detect_data&.uuid
      return not_detected_update
    else
      # last_detect_data = DetectChangeTimetable.create(
      #   uuid: md5
      # )

      # 掲載されているリンクリストを作成
      dividers = []
      container.css('ul').each do | divider |
        divider_links = []
        divider_title = divider.css('li[data-role="list-divider"]').inner_text
        divider.css('a').each do | link |
          divider_links << {
            title: link.inner_text,
            link: link.attribute("href").value
          }
        end
        dividers << {
          divider: divider_title,
          links: divider_links,
        }
      end

      slack_webhook_url = ENV.fetch('WEBHOOK_URL', nil)
      unless slack_webhook_url.nil?
        
        attachments = [
          {
            color: "success",
            pretext: "時刻表掲載ページの更新を検知しました。",
            title: "スクールバス時刻表",
            title_link: url,
            fields: [
              {
                title: "Detection Hash",
                value: last_detect_data.uuid
              }
            ],
            footer: "Detection Bot",
            footer_icon: "https://platform.slack-edge.com/img/default_application_icon.png",
            ts: last_detect_data.created_at.to_i
          }
        ]

        dividers.each do | divider |
          divider[:links].each_with_index do | link, index |
            attachments << {
              color: "#FF8C00",
              pretext: index == 0 ? divider[:divider] : "",
              title: link[:title],
              title_link: "#{request.protocol}#{request.host_with_port}/register/new?url=#{HOST_URL}#{link[:link]}",
              text: link[:link]
            }
          end
        end

        notifier = Slack::Notifier.new(slack_webhook_url, username: "時刻表更新Bot")
        notifier.post attachments: attachments
      end

      # render json: { success: true, data: last_detect_data.uuid }, status: :ok
      render json: { success: true, data: dividers }, status: :ok
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
