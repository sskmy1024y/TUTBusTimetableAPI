# TUT Bus Timetable API
東京工科大学の学バスの時刻表を返すAPI

## How to build

### Require
* dokcer
* docker-compose

### run command
```bash
$ docker-compose build
$ docker-compose up -d
```

out port is `:3000`

## API

### get timetable
| method | endpoint                   |
| ------ | -------------------------- |
| GET    | `base_url/api/v1/timetable |

* request params

| params   | type     | require | detail                                                  |
| -------- | -------- | ------- | ------------------------------------------------------- |
| key      | `string` | o       | token                                                   |
| from     | `int`    | o       | [Bus stop code](#BusStationCode) of departure place     |
| to       | `int`    | o       | [Bus stop code](#BusStationCode) of arrival place       |
| datetime | `int`    |         | Specify the time to search. Default is **current time** |
| limit    | `int`    |         | Maximum number of searches. The default is **5**        |

### BusStationCode

| code | bus stop name      |
| ---- | ------------------ |
| 1    | `八王子みなみ野駅` |
| 2    | `図書館棟前`       |
| 3    | `八王子駅南口`     |
| 4    | `厚生棟前`         |
| 5    | `学生会館`         |
| 6    | `正門ロータリー前` |
