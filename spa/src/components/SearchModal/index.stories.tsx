import { useState } from 'hooks'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { Button } from 'react-bootstrap'
import Provider from 'stories/Provider'

import { SearchModalBody } from './SearchModalBody'

const stories = storiesOf('Components|Modal', module)
stories.addDecorator(story => <Provider story={story} />)

stories.addDecorator(withKnobs).add('SearchModal', () => {
  const [show, setShow] = useState(false)

  const onClose = () => {
    setShow(!show)
  }

  return (
    <>
      <Button onClick={onClose}>{show ? 'Hide' : 'Show'}</Button>
      <SearchModalBody show={show} onHide={() => setShow(false)} />
    </>
  )
})
