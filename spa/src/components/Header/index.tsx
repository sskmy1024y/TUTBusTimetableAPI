import { Container, Nav, Navbar } from 'react-bootstrap'
import React from 'react'

import { LinkType } from 'lib/types'
import styled from 'styled-components'

interface HeaderProps {
  title: string
  navLists: LinkType[]
}

export default function Header({ title, navLists }: HeaderProps) {
  return (
    <header>
      <Container>
        <Navbar bg='light' expand='lg' role='navigation' fixed='top'>
          <Container>
            <HeaderText>
              <Navbar.Brand href='/'>{title}</Navbar.Brand>
            </HeaderText>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                {navLists.map(nav => {
                  return (
                    <Nav.Link key={nav.name} href={nav.path}>
                      {nav.name}
                    </Nav.Link>
                  )
                })}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </header>
  )
}

const HeaderText = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 0;
  font-weight: 500;
  line-height: 1.2;
`
