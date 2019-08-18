import React from 'react'

import Header, { LinkProps } from './components/Header'
import Home from './pages/Home/'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'

function App() {
  const headerLinks: LinkProps[] = [
    {
      name: 'Home',
      url: '#Home'
    },
    {
      name: 'API Doc',
      url: '#api'
    },
    {
      name: 'Contacts',
      url: '#contacts'
    }
  ]

  return (
    <>
      <Header title='TUT Bus Timetable API' navLists={headerLinks} />
      <MainContainer>
        <Home />
      </MainContainer>
    </>
  )
}

const MainContainer = styled(Container)`
  padding-top: 60px;
`

export default App
