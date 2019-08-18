import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import TimeBoard from '.'
import BulletinHeader from './BulletinHeader'

const stories = storiesOf('Components|TimeBoard', module)

stories.addDecorator(withKnobs).add('TimeBoard', () => {
  return <TimeBoard />
})

stories.addDecorator(withKnobs).add('BulletinHeader', () => {
  const title = text('text', 'sample')

  return <BulletinHeader text={title} />
})
