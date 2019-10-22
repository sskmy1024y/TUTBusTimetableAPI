FROM ruby:2.5.5

ENV LANG C.UTF-8

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN apt-get update -qq && \
  apt-get install -y build-essential libpq-dev

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*

ENV BUNDLE_JOBS=4 \
  BUNDLE_PATH=/bundle \
  APP_DIR=/app

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY src/Gemfile $APP_DIR
COPY src/Gemfile.lock $APP_DIR

RUN gem install bundler && \
  gem install rails && \
  bundle install --clean

# Add a script to be executed every time the container starts.
COPY src/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
