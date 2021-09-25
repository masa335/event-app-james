FROM ruby:2.6.5

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN mkdir /app
WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN apt-get update -qq && \
    apt-get install -y build-essential \
    libpq-dev \
    sudo

RUN bundle install

ADD . /app

# Nginxと通信を行うための記述、githubActionのテスト
RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

VOLUME /app/public
VOLUME /app/tmp