import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import Footer from '.'
import Provider from 'stories/Provider'

const stories = storiesOf('Components|Footer', module)
stories.addDecorator(story => <Provider story={story} />)

stories.addDecorator(withKnobs).add('Footer', () => {
  return <Footer />
})
