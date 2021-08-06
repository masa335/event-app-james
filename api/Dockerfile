FROM ruby:2.6.5

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN mkdir /app
WORKDIR /app

ADD Gemfile /app/Gemfile

RUN apt-get update -qq && \
    apt-get install -y build-essential \
    libpq-dev \
    sudo

RUN bundle install

ADD . /app