import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { useState } from 'hooks'

import { SearchModalBody } from './SearchModalBody'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

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
