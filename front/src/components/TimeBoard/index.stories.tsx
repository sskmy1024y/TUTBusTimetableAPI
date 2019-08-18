import React from 'react'

import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { TimetableListType } from 'src/lib/types'
import TimeBoard from '.'
import BulletinHeader from './BulletinHeader'

const stories = storiesOf('Components|TimeBoard', module)

stories.addDecorator(withKnobs).add('TimeBoard', () => {
  const timetableList: TimetableListType = {
    list: [
      {
        id: 1,
        arrivalTime: new Date(),
        departureTime: new Date(),
        isShuttle: true
      }
    ],
    departure: {
      id: 1,
      name: 'みなみの'
    },
    arrival: {
      id: 2,
      name: '学校'
    }
  }
  return <TimeBoard timetableList={timetableList} />
})

stories.addDecorator(withKnobs).add('BulletinHeader', () => {
  const title = text('text', 'sample')

  return <BulletinHeader text={title} />
})
