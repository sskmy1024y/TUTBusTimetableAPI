import React from 'react'
import { Accordion } from 'react-bootstrap'

import ClientLINEBot from './clients/LINEBot'
import ClientAndmore from './clients/AndMore'

import styled from 'styled-components'

export default function ClientAccordion() {
  return (
    <>
      <StyledTitle>Client List</StyledTitle>
      <Accordion defaultActiveKey="linebot">
        <ClientLINEBot eventKey={'linebot'} />
        <ClientAndmore eventKey={'andmore'} />
      </Accordion>
    </>
  )
}

const StyledTitle = styled.h2`
  padding: 0.25em 0.5em;
  color: #494949;
  background: transparent;
  border-left: solid 5px #7db4e6;
`
