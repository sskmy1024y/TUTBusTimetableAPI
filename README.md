# TUT Bus Timetable API [![Build Status](https://travis-ci.org/sskmy1024y/TUTBusTimetableAPI.svg?branch=develop)](https://travis-ci.org/sskmy1024y/TUTBusTimetableAPI)

東京工科大学の学バスの時刻表を返すAPI

## Require

* dokcer
* docker-compose

## How to develop build

### run command

```bash
$ docker-compose build
$ docker-compose run --rm api rails db:drop db:create db:migrate db:seed

# gem更新時 ========================
$ docker-compose run --rm api bundle install
# =================================

$ docker-compose up -d
```

## How to production build

### Deploy

```bash
$ ./deploy < all | spa | api >
```

example `$ ./deploy spa`

### First time

初回ビルドのみこちら

```bash
$ docker-compose build --no-cache spa
$ docker-compose run --rm spa yarn build

$ docker-compose -f docker-compose.production.yml build
```

`Secret key`を生成

```bash
$ docker-compose -f docker-compose.production.yml run --rm app rails secret
```

出てきた値を `.env` に

```enviroment
SECRET_KEY_BASE= xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

```bash
$ docker-compose -f docker-compose.production.yml run --rm app rails db:drop db:create db:seed db:migrate RAILS_ENV=production
$ docker-compose -f docker-compose.production.yml run --rm app rails assets:precompile RAILS_ENV=production

$ docker-compose -f docker-compose.production.yml up -d
```

out port is `:22222`

## Check Origin Timetable

* 設定内容にエラーがないか確認
  * `bundle exec whenever`
* 設定されているcronを見る
  * `crontab -l`
* cronにデータを反映
  * `bundle exec whenever --update-crontab`
* cronからデータを削除
  * `bundle exec whenever --clear-crontab`

## How to debug

* add `binding.pry` where breakpoint in your source.

and 

```bash
$ docker-compose run --rm --service-ports api
```
