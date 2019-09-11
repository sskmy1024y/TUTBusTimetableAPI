import React from 'react'

import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import TimeBoard from '.'
import { TimetableCollectType } from '../../modules/Timetable/type'
import BulletinHeader from './BulletinHeader'

const stories = storiesOf('Components|TimeBoard', module)

stories.addDecorator(withKnobs).add('TimeBoard', () => {
  const timetableList: TimetableCollectType = {
    arrival: {
      id: 2,
      name: '学校',
    },
    departure: {
      id: 1,
      name: 'みなみの',
    },
    list: [
      {
        arrivalTime: new Date(),
        departureTime: new Date(),
        id: 1,
        isShuttle: true,
      },
    ],
  }

  return <TimeBoard timetable={timetableList} />
})

stories.addDecorator(withKnobs).add('BulletinHeader', () => {
  const title = text('text', 'sample')

  return <BulletinHeader text={title} />
})