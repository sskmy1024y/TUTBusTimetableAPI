
# TUT Bus Timetable API
<!-- TOC -->

- [TUT Bus Timetable API](#tut-bus-timetable-api)
  - [API](#api)
    - [get timetable](#get-timetable)
    - [Get Places](#get-places)
      - [BusStationCode](#busstationcode)
    - [Get Available Places](#get-available-places)

<!-- /TOC -->
## API

### get timetable

| method | endpoint                     |
| ------ | ---------------------------- |
| GET    | `base_url/api/v1/timetables` |

* request params

    | params   | type     | require | detail                                                                           |
    | -------- | -------- | :-----: | -------------------------------------------------------------------------------- |
    | from     | `int`    |    △    | [Bus stop code](#BusStationCode) of departure place                              |
    | to       | `int`    |    △    | [Bus stop code](#BusStationCode) of arrival place                                |
    | datetime | `string` |         | Specify the time to search. Exp, `2019-05-01 10:00`. Default is **current time** |
    | limit    | `int`    |         | Maximum number of searches. The default is **5**                                 |


* request url sample:
  
  ```url
  base_url/api/v1/timetables?from=2&datetime=2019-05-20%2007:21
  ```
  スペースは`%20`で置き換え

* response body sample:
  * success `200 OK`
    ```json

    ```

### Get Places
| method | endpoint                 |
| ------ | ------------------------ |
| GET    | `base_url/api/v1/places` |

* response body sample:
  * success `200 OK`
  ```json
  [
      {
          "id": 1,
          "name": "八王子みなみ野駅"
      },
      {
          "id": 2,
          "name": "図書館棟前"
      },
      {
          "id": 3,
          "name": "八王子駅南口"
      },
      {
          "id": 4,
          "name": "厚生棟前"
      },
      {
          "id": 5,
          "name": "学生会館"
      },
      {
          "id": 6,
          "name": "正門ロータリー前"
      }
  ]
  ```

#### BusStationCode

| code | bus stop name      |
| ---- | ------------------ |
| 1    | `八王子みなみ野駅` |
| 2    | `図書館棟前`       |
| 3    | `八王子駅南口`     |
| 4    | `厚生棟前`         |
| 5    | `学生会館`         |
| 6    | `正門ロータリー前` |


### Get Available Places
| method | endpoint                           |
| ------ | ---------------------------------- |
| GET    | `base_url/api/v1/places/available` |

* request params

| params | type     | require | detail                                                             |
| ------ | -------- | :-----: | ------------------------------------------------------------------ |
| date   | `string` |         | Specify the time to search. Exp. `2019-10-24` Default is **today** |

