import React from 'react'

import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import TimeBoard from '.'
import { TimetableCollectType } from '../../modules/Timetable/type'
import BulletinHeader from './BulletinHeader'
import TimeBoardItem from './TimeBoardItem'

const stories = storiesOf('Components|TimeBoard', module)

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
      arrivalTime: new Date(),
      departureTime: new Date(),
      id: 1,
      isShuttle: true,
    },
  ],
}

stories.addDecorator(withKnobs).add('TimeBoard', () => {
  const timetableList: TimetableCollectType[] = [timetableData, timetableData, timetableData]
  return <TimeBoard timetables={timetableList} />
})

stories.addDecorator(withKnobs).add('TimeBoardItem', () => {
  return <TimeBoardItem timetable={timetableData} />
})

stories.addDecorator(withKnobs).add('BulletinHeader', () => {
  const title = text('text', 'sample')

  return <BulletinHeader title={title} />
})
