import { Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'hooks'
import React from 'react'

import { TimetableCollectType, TimetableDataType } from 'modules/Timetable/type'

import { DefaultView, FullMarquee, SearchResult } from './BulletinBody'
import { RootState } from 'modules'
import BulletinHeader from './BulletinHeader'

import media from 'styled-media-query'
import styled from 'styled-components'
import { thunkActionCreators } from 'middleware/thunkAction'

interface SortedTimtetableType extends TimetableCollectType {
  index?: number
}

interface TimeBoardProps {
  timetable: SortedTimtetableType
}

export default function TimeBoardItem({ timetable }: TimeBoardProps) {
  const dispatch = useDispatch()
  const isSearch = useSelector<RootState, boolean>(state => state.search.isSearch)
  const labels = ['先発', '次発', '次々発', '四発', '五発']
  const lastLabel = '最終'

  const isActive = timetable?.index !== -1 ?? false

  const handleFavorite = () => {
    dispatch(
      thunkActionCreators.saveFavoriteCourse({
        type: isActive ? 'REMOVE' : 'ADD',
        arrival: timetable.arrival,
        departure: timetable.departure
      })
    )
  }

  return (
    <BulletinBoard>
      <BulletinHeader
        title={timetable.departure.name}
        subText={`発（${timetable.arrival.name}行）`}
        showFavIcon
        isActive={isActive}
        onFavorite={handleFavorite}
      />
      <BoardBody>
        <Row>
          {timetable.timetables.length > 0 ? (
            timetable.timetables.map((row, index) =>
              isSearch ? (
                <SearchResult
                  key={index}
                  label={row.isLast ? lastLabel : index + 1}
                  timetable={{ ...row, arrival: timetable.arrival, departure: timetable.departure }}
                />
              ) : (
                <DefaultView
                  key={index}
                  label={row.isLast ? lastLabel : labels[index]}
                  timetable={{ ...row, arrival: timetable.arrival, departure: timetable.departure }}
                />
              )
            )
          ) : (
            <FullMarquee
              dataType={isSearch ? TimetableDataType.BusNotFound : TimetableDataType.BusFinished}
            />
          )}
        </Row>
      </BoardBody>
    </BulletinBoard>
  )
}

// TODO : Want to refactor timebord
interface AnnounceItemProps {
  type: TimetableDataType
}
export function AnnounceItem({ type }: AnnounceItemProps) {
  return (
    <BulletinBoard>
      <BulletinHeader title={'本日のバス'} />
      <BoardBody>
        <Row>
          <FullMarquee dataType={type} />
        </Row>
      </BoardBody>
    </BulletinBoard>
  )
}

const BulletinBoard = styled.div`
  background-color: rgb(76, 83, 109);
  color: #fff;
`

const BoardBody = styled.div`
  background-color: #222;

  ${media.lessThan('medium')`
    padding: 0 5px;
  `}

  ${media.greaterThan('medium')`
    padding: 0 20px;
  `}

  ${media.greaterThan('large')`
    padding: 0 50px;
  `}
`
