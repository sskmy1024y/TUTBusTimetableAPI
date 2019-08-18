import React from 'react'

import { LinkType } from 'lib/types'
import { Container, Nav, Navbar } from 'react-bootstrap'

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
            <Navbar.Brand href='#home'>{title}</Navbar.Brand>
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
