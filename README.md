# TUT Bus Timetable API

東京工科大学の学バスの時刻表を返すAPI

## How to build

### Require

* dokcer
* docker-compose

### run command

```bash
$ docker-compose build
$ docker-compose run --rm api rails db:drop db:create db:migrate db:seed

# gem更新時 ========================
$ docker-compose run --rm api bundle install
# =================================

$ docker-compose up -d
```

### production build

Reactをbuild

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
$ docker-compose -f docker-compose.production.yml run --rm app rails assets:precompile RAILS_ENV=production

$ docker-compose -f docker-compose.production.yml up -d
```

out port is `:22222`

## How to debug

* add `binding.pry` where breakpoint in your source.

and 

```bash
$ docker-compose run --rm --service-ports web
```
