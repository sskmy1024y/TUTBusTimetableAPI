import { storiesOf } from '@storybook/react'
import { text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'

import { LinkType } from 'lib/types'
import Provider from 'stories/Provider'

import Header from '.'

const stories = storiesOf('Components|Header', module)
stories.addDecorator(story => <Provider story={story} />)

stories.addDecorator(withKnobs).add('Header', () => {
  const title = text('title', 'sample')

  const links: LinkType[] = [
    {
      name: 'nav1',
      path: '#nav1'
    }
  ]

  return <Header title={title} navLists={links} />
})
