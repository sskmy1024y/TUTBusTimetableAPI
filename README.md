# TUT Bus Timetable API

東京工科大学の学バスの時刻表を返す API

## How to build

### Require

- dokcer
- docker-compose

### Prepare

set admin name and password to `.env`

### run command

```bash
$ docker-compose build
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
