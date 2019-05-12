FROM ruby:2.5

ENV LANG C.UTF-8

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev
    
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
        && apt-get install -y nodejs

WORKDIR /myapp

COPY src/Gemfile Gemfile
COPY src/Gemfile.lock Gemfile.lock

RUN gem install bundler && bundle install --clean

# Add a script to be executed every time the container starts.
COPY src/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
