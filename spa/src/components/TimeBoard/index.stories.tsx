import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'
import Provider from 'stories/Provider'

import { DefaultView, FullMarquee } from './BulletinBody'
import { TimetableCollectType, TimetableDataType } from 'modules/Timetable'
import BulletinHeader from './BulletinHeader'
import TimeBoard from '.'
import TimeBoardItem from './TimeBoardItem'

const stories = storiesOf('Components|TimeBoard', module)
stories.addDecorator(story => <Provider story={story} />)
const decorator = stories.addDecorator(withKnobs)

const datetime = new Date('2019-10-24 10:10')

const timetableData: TimetableCollectType = {
  arrival: {
    id: 2,
    name: '学校',
  },
  departure: {
    id: 1,
    name: 'みなみの',
  },
  timetables: [
    {
      arrivalTime: datetime,
      departureTime: datetime,
      id: 1,
      isShuttle: true,
      isLast: true,
    },
  ],
}

decorator.add('TimeBoard', () => {
  const timetableList: TimetableCollectType[] = [timetableData, timetableData, timetableData]
  return <TimeBoard timetables={timetableList} />
})

decorator.add('TimeBoardItem', () => {
  return <TimeBoardItem timetable={timetableData} />
})

decorator.add('BulletinBody', () => {
  return (
    <>
      <DefaultView
        timetable={{
          ...timetableData.timetables[0],
          arrival: timetableData.arrival,
          departure: timetableData.departure,
        }}
        label={'先発'}
      />
      <FullMarquee dataType={TimetableDataType.BusFinished} />
    </>
  )
})

decorator.add('BulletinHeader', () => {
  const title = text('text', 'sample')

  return <BulletinHeader title={title} />
})
