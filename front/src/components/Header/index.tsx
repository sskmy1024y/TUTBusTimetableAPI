import React from 'react'

import { Container, Nav, Navbar } from 'react-bootstrap'

export interface LinkProps {
  url: string
  name: string
}

interface HeaderProps {
  title: string
  navLists: LinkProps[]
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
                    <Nav.Link key={nav.name} href={nav.url}>
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
