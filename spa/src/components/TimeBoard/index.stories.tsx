import React from 'react'

import { number, select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Provider from 'stories/Provider'

import { Container } from 'stories'
import { TimetableCollectType, TimetableDataType } from 'modules/Timetable'
import BulletinHeader from './BulletinHeader'
import TimeBoardItem, { AnnounceItem } from './TimeBoardItem'

const stories = storiesOf('Components|TimeBoard', module)
stories.addDecorator(story => <Provider story={story} />)
const decorator = stories.addDecorator(withKnobs)

const datetime = new Date('2019-10-24 10:10')

const timetableData1: TimetableCollectType = {
  arrival: {
    id: 2,
    name: '学校'
  },
  departure: {
    id: 1,
    name: 'みなみの'
  },
  timetables: [
    {
      arrivalTime: datetime,
      departureTime: datetime,
      id: 1,
      isShuttle: true,
      isLast: false
    }
  ]
}

const timetableData2: TimetableCollectType = {
  arrival: {
    id: 2,
    name: '学校'
  },
  departure: {
    id: 3,
    name: '八王子'
  },
  timetables: [
    {
      arrivalTime: datetime,
      departureTime: datetime,
      id: 2,
      isShuttle: false,
      isLast: true
    }
  ]
}

const timetableData3: TimetableCollectType = {
  arrival: {
    id: 1,
    name: 'みなみの'
  },
  departure: {
    id: 3,
    name: '八王子'
  },
  timetables: []
}

decorator.add('TimeBoard', () => {
  const width = number('width', 698)
  const timetableList: TimetableCollectType[] = [timetableData1, timetableData2, timetableData3]
  return (
    <Container width={width}>
      {timetableList.map((timetable, index) => {
        return <TimeBoardItem key={index} timetable={timetable} />
      })}
    </Container>
  )
})

decorator.add('TimeBoardItem', () => {
  const width = number('width', 698)
  return (
    <>
      <Container width={width}>
        <TimeBoardItem timetable={timetableData1} />
      </Container>
    </>
  )
})

decorator.add('AnnounceItem', () => {
  const width = number('width', 698)
  const timetableDataTypeOptions = {
    NoBus: TimetableDataType.NoBus,
    BusFinished: TimetableDataType.BusFinished,
    BusNotFound: TimetableDataType.BusNotFound,
    NowLoading: TimetableDataType.NowLoading,
    LoadingFailed: TimetableDataType.LoadingFailed
  }
  const type = select('Announce Type', timetableDataTypeOptions, TimetableDataType.BusFinished)

  return (
    <Container width={width}>
      <AnnounceItem type={type} />
    </Container>
  )
})

decorator.add('BulletinHeader', () => {
  const title = text('title', 'sample')
  const subText = text('text', 'example')
  const width = number('width', 698)

  return (
    <Container width={width}>
      <BulletinHeader title={title} subText={subText} />
    </Container>
  )
})
