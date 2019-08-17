import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Header, { LinkProps } from '.'

const stories = storiesOf('Other|Tooltip', module)

stories.addDecorator(withKnobs).add('Tooltip', () => {
  const title = text('title', 'sample')

  const links: LinkProps[] = [
    {
      name: 'nav1',
      url: '#nav1'
    }
  ]

  return <Header title={title} navLists={links}></Header>
})
