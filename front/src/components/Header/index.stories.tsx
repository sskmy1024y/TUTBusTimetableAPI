import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { LinkType } from 'lib/types'
import React from 'react'
import Header from '.'

const stories = storiesOf('Components|Header', module)

stories.addDecorator(withKnobs).add('Header', () => {
  const title = text('title', 'sample')

  const links: LinkType[] = [
    {
      name: 'nav1',
      path: '#nav1'
    }
  ]

  return <Header title={title} navLists={links}></Header>
})
