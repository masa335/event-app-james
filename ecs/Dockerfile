FROM ruby:2.6.5
ENV LANG C.UTF-8
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
apt-get install nodejs

RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

ENV APP_PATH /app

RUN mkdir $APP_PATH
WORKDIR $APP_PATH

ADD Gemfile $APP_PATH/Gemfile
ADD Gemfile.lock $APP_PATH/Gemfile.lock

RUN gem install bundler:2.1.4
RUN bundle install

ADD . $APP_PATH

RUN mkdir -p tmp/sockets
RUN mkdir -p tmp/pids

VOLUME $APP_PATH/public
VOLUME $APP_PATH/tmp

RUN yarn install --check-files
# RUN SECRET_KEY_BASE=bundle exec rails assets:precompile