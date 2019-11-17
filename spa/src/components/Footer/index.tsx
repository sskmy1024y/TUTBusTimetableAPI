import { Container } from 'react-bootstrap'
import React from 'react'

import styled from 'styled-components'

export default function Footer() {
  return (
    <FooterContainer>
      <Container>
        <CopyWrite>
          &copy; sho (<Link href='http://github.com/sskmy1024y'>sskmy1024y)</Link>
        </CopyWrite>
      </Container>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  margin-top: 50px;
  padding-top: 5px;
  border-top: 1px solid #eaeaea;
  height: 50px;
`

const CopyWrite = styled.small`
  color: #777;
`

const Link = styled.a`
  color: #555;

  &:hover {
    color: #222;
  }
`
