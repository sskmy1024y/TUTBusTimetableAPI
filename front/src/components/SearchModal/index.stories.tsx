import { useState } from 'hooks'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import { SearchModalBody } from './SearchModalBody'

const stories = storiesOf('Componetns|Modal', module)

stories.addDecorator(withKnobs).add('SearchModal', () => {
  const [show, setShow] = useState(false)

  const onClose = () => {
    setShow(!show)
  }

  return (
    <Container>
      <Button onClick={onClose}>{show ? 'Hide' : 'Show'}</Button>
      <SearchModalBody show={show} onHide={() => setShow(false)} />
    </Container>
  )
})

const Container = styled.div`
  background-color: #666;
`
