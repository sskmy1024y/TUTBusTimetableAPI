# TUT Bus Timetable API

東京工科大学の学バスの時刻表を返すAPI

## How to build

### Require

* dokcer
* docker-compose

### run command

```bash
$ docker-compose build
$ docker-compose run --rm web rails db:drop db:create db:migrate db:seed

# gem更新時 ========================
$ docker-compose run --rm web bundle install
# =================================

$ docker-compose up -d
```

### production build

```bash
$ rails secret
```

出てきた値を `.env` に

```enviroment
SECRET_KEY_BASE= xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

```bash
$ rails assets:precompile RAILS_ENV=production
```

out port is `:22222`
