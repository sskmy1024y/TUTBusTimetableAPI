import React from 'react'

import { Container, Navbar, Nav } from 'react-bootstrap'

export default function Header() {
  return (
    <header>
      <Container>
        <Navbar bg='light' expand='lg' role='navigation' fixed='top'>
          <Container>
            <Navbar.Brand href='#home'>TUT Bus Timetable API</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <Nav.Link href='#home'>Home</Nav.Link>
                <Nav.Link href='#link'>API Doc</Nav.Link>
                <Nav.Link href='#link'>Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </header>
  )
}
