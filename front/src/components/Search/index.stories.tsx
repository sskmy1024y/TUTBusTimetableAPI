import React from 'react'

import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { useState } from 'hooks'

import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import SearchModal from 'components/SearchModal'

const stories = storiesOf('Componetns|Modal', module)

stories.addDecorator(withKnobs).add('SearchModal', () => {
  const [show, setShow] = useState(false)

  const onClose = () => {
    setShow(!show)
  }

  return (
    <Container>
      <Button onClick={onClose}>{show ? 'Hide' : 'Show'}</Button>
      <SearchModal show={show} onHide={() => setShow(false)}></SearchModal>
    </Container>
  )
})

const Container = styled.div`
  background-color: #666;
`
