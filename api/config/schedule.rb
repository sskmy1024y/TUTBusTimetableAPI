# Rails.rootを使用するために必要
require File.expand_path(File.dirname(__FILE__) + "/environment")
# cronを実行する環境変数
rails_env = ENV['RAILS_ENV'] || :development
# cronを実行する環境変数をセット
set :environment, rails_env
# cronのログの吐き出し場所
set :output, error: "#{Rails.root}/log/cron_error.log", standard: "#{Rails.root}/log/cron.log"

# 環境変数を渡す
env :PATH, ENV['PATH']
env :BUNDLE_PATH, ENV['BUNDLE_PATH']
env :GEM_HOME, ENV['BUNDLER_ORIG_GEM_HOME']

# NOTE: cron時に環境変数渡してくれない…
env :MYSQL_ROOT_PASSWORD, ENV['MYSQL_ROOT_PASSWORD']
env :MYSQL_USER, ENV['MYSQL_USER']
env :MYSQL_PASSWORD, ENV['MYSQL_PASSWORD']
env :MYSQL_DATABASE, ENV['MYSQL_DATABASE']
env :MYSQL_HOST, ENV['MYSQL_HOST']
env :BASIC_AUTH_NAME, ENV['BASIC_AUTH_NAME']
env :BASIC_AUTH_PASSWORD, ENV['BASIC_AUTH_PASSWORD']
env :CHECK_TIMETABLE_URL, ENV['CHECK_TIMETABLE_URL']
env :WEBHOOK_URL, ENV['WEBHOOK_URL']
env :SELF_HOSTNAME, ENV['SELF_HOSTNAME']

set :job_template, nil

# stagingのみで実行
if rails_env.to_sym == :development
  # clear cache
  interval = (9..18).select{ |_| _%3 == 0 }.map {|_| "#{_}:00" }
  every 1.day, at: interval do
    rake "cron:detect_timetable_changes"
  end
end
