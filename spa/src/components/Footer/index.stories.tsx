import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import Provider from 'stories/Provider'
import Footer from '.'

const stories = storiesOf('Components|Footer', module)
stories.addDecorator(story => <Provider story={story} />)

stories.addDecorator(withKnobs).add('Footer', () => {
  return <Footer />
})
