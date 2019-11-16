# For base image ====================
FROM ruby:2.5.5 as base

ENV LANG C.UTF-8

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN apt-get update -qq && \
  apt-get install -y build-essential libpq-dev cron

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV BUNDLE_JOBS=4 \
  BUNDLE_PATH=/bundle \
  BUNDLER_VERSION=2.0.2 \
  APP_DIR=/app

RUN mkdir -p $APP_DIR
# ====================================

# For development ====================
FROM base as develop

WORKDIR $APP_DIR

COPY Gemfile $APP_DIR
COPY Gemfile.lock $APP_DIR

RUN gem install bundler && \
  gem install rails

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
# ====================================

# For production =====================
FROM base as release

WORKDIR $APP_DIR

COPY . $APP_DIR

RUN gem install bundler && \
  gem install rails && \
  bundle install --clean && \
  bundle exec whenever -i

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
# ====================================

