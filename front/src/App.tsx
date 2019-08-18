import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home/'

import { LinkType } from 'lib/types'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

function App() {
  const headerLinks: LinkType[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'API Doc',
      path: '/api/v1/docs'
    },
    {
      name: 'Contacts',
      path: '/contacts'
    }
  ]

  return (
    <>
      <Header title='TUT Bus Timetable API' navLists={headerLinks} />
      <MainContainer>
        <Router>
          <Route exact path='/' component={Home} />
        </Router>
      </MainContainer>
    </>
  )
}

const MainContainer = styled(Container)`
  padding-top: 60px;
`

export default App
