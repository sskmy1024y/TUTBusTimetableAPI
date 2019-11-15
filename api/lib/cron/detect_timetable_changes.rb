require 'nokogiri'
require 'open-uri'
require 'digest/md5'

module Cron::DetectTimetableChanges extend self

  HOST_URL = 'http://www.teu.ac.jp'
  
  def batch
    # 取得するHTMLのURLを設定
    url = ENV.fetch('CHECK_TIMETABLE_URL', '')
    return bad_request("URL is not specified") if url.empty?
    
    # スクレイピング実行
    charset = nil
    html = open(url) do |f|
      charset = f.charset
      f.read
    end
    doc = Nokogiri::HTML.parse(html, charset)
    return internal_error("Could not parse html in nokogiri") if doc.blank?

    # 時刻表部分を取得してMD5を決定
    container = doc.css('.accessstyle')
    md5 = Digest::MD5.new.update(container.to_s).to_s

    # 直前のMD5と比較して、変更があれば通知を実行
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

      # Slack通知を実行 ===============================================
      slack_webhook_url = ENV.fetch('WEBHOOK_URL', nil)
      unless slack_webhook_url.nil?
        
        attachments = [
          {
            color: "#00CC99",
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
              text: "<#{generate_self_link("/register/new?url=#{HOST_URL}#{link[:link]}")}|Register> ・ <#{HOST_URL}#{link[:link]}|View>",
            }
          end
        end

        notifier = Slack::Notifier.new(slack_webhook_url, username: "時刻表更新Bot")
        notifier.post attachments: attachments
      end
      # =============================================================

      return { success: true, data: last_detect_data.uuid, code: 200 }
    end
  end

  private  

  def self_domain_with_port
    if local_variables.include?(:request)
      "#{request.protocol}#{request.host_with_port}"
    else
      ENV.fetch('SELF_HOSTNAME', '')
    end
  end

  def generate_self_link(path)
    self_domain = self_domain_with_port
    return '' if self_domain.empty?

    "#{self_domain}#{path}"
  end

  def internal_error(error_str)
    { success: false, data: error_str, code: 500 }
  end

  def not_detected_update
    { success: true, data: "not detectted update", code: 204 }
  end

  def bad_request(error_str)
    { success: false, data: error_str, code: 400 }
  end

end
