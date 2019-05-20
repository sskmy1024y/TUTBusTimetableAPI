# API

## Get Timetable

指定したパラメータに合うバスの時刻表を返すエンドポイント

| method | endpoint                     |
| ------ | ---------------------------- |
| GET    | `base_url/api/v1/timetables` |

* request params

    | params   | type     | require | detail                                              | default  |
    | -------- | -------- | :-----: | --------------------------------------------------- | -------- |
    | from     | `int`    |    △    | 出発地の [バス停ID](#BusStationCode) を指定         | -        |
    | to       | `int`    |    △    | 行き先の [バス停ID](#BusStationCode) を指定         | -        |
    | datetime | `string` |         | 検索する日付と時間を指定。(例：`2019-05-01 10:00`). | 現在時刻 |
    | limit    | `int`    |         | 検索結果の最大数。                                  | 5        |


* request url sample:
  
  ```url
  base_url/api/v1/timetables?from=2&datetime=2019-05-20%2007:21
  ```
  ※スペースのURIEncodeは`%20`

* response body sample:
  * success `200 OK`
    ```json
    {
        "success": true,
        "timetables": [
            {
                "id": 662,
                "course_id": 2,
                "timetable_set_id": 4,
                "arrival_time": "2000-01-01T07:38:00.000+09:00",
                "departure_time": "2000-01-01T07:28:00.000+09:00",
                "is_shuttle": false
            },
            {
                "id": 663,
                "course_id": 2,
                "timetable_set_id": 4,
                "arrival_time": "2000-01-01T07:44:00.000+09:00",
                "departure_time": "2000-01-01T07:34:00.000+09:00",
                "is_shuttle": false
            },
            {
                "id": 664,
                "course_id": 2,
                "timetable_set_id": 4,
                "arrival_time": "2000-01-01T07:52:00.000+09:00",
                "departure_time": "2000-01-01T07:42:00.000+09:00",
                "is_shuttle": false
            }
        ],
        "course": {
            "id": 2,
            "arrival_id": 1,
            "departure_id": 2,
            "arrival": {
                "id": 1,
                "name": "八王子みなみ野駅"
            },
            "departure": {
                "id": 2,
                "name": "図書館棟前"
            }
        }
    }
    ```

  * Error `400 Bad Request` 
  
    行き先( `to` )もしくは出発地( `from` )のパラメータを指定していない時など
    ```json
    {
        "success": false,
        "errors": "400 Bat Request. Please check require parameter."
    }
    ```
 
 
## Get All Places

バス停の情報一覧を返すエンドポイント

| method | endpoint                 |
| ------ | ------------------------ |
| GET    | `base_url/api/v1/places` |

* response body sample:
  * success `200 OK`
  ```json
  {
    "success": true,
    "places": [
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
  }
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


## Get Available Places

運行しているバス停のみを返すエンドポイント

| method | endpoint                           |
| ------ | ---------------------------------- |
| GET    | `base_url/api/v1/places/available` |

* request params
  
    | params | type     | require | detail                                        | default  |
    | ------ | -------- | :-----: | --------------------------------------------- | -------- |
    | date   | `string` |         | 検索する日付と時間を指定。(例：`2019-05-01`). | **今日** |

* request body sample:
  ```url
  base_url/api/v1/places/available?date=2019-05-18
  ```
* response body sample:
  * success `200 OK`
    ```json
    {
        "success": true,
        "places": [
            {
                "id": 1,
                "name": "八王子みなみ野駅",
                "created_at": "2019-05-19T00:24:38.000+09:00",
                "updated_at": "2019-05-19T00:24:38.000+09:00"
            },
            {
                "id": 2,
                "name": "図書館棟前",
                "created_at": "2019-05-19T00:24:38.000+09:00",
                "updated_at": "2019-05-19T00:24:38.000+09:00"
            },
            {
                "id": 3,
                "name": "八王子駅南口",
                "created_at": "2019-05-19T00:24:38.000+09:00",
                "updated_at": "2019-05-19T00:24:38.000+09:00"
            },
            {
                "id": 4,
                "name": "厚生棟前",
                "created_at": "2019-05-19T00:24:38.000+09:00",
                "updated_at": "2019-05-19T00:24:38.000+09:00"
            }
        ]
    }
    ```

