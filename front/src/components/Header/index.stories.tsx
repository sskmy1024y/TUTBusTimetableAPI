import { text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Header, { LinkProps } from '.'

const stories = storiesOf('Components|Header', module)

stories.addDecorator(withKnobs).add('Header', () => {
  const title = text('title', 'sample')

  const links: LinkProps[] = [
    {
      name: 'nav1',
      url: '#nav1'
    }
  ]

  return <Header title={title} navLists={links}></Header>
})
