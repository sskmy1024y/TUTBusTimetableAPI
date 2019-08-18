import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import APIDoc from './pages/APIDocs'
import Contacts from './pages/Contacts'
import Home from './pages/Home/'

import { LinkType } from 'lib/types'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

function App() {
  const headerLinks: LinkType[] = [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'API Doc',
      path: '/api/v1/docs',
      component: APIDoc
    },
    {
      name: 'Contacts',
      path: '/contacts',
      component: Contacts
    }
  ]

  return (
    <>
      <Header title='TUT Bus Timetable API' navLists={headerLinks} />
      <MainContainer>
        <Router>
          {headerLinks.map(page => {
            return <Route exact path={page.path} component={page.component} />
          })}
        </Router>
      </MainContainer>
    </>
  )
}

const MainContainer = styled(Container)`
  padding-top: 60px;
`

export default App
