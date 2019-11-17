import { Route, BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

import Contacts from 'pages/Contacts'
import Header from 'components/Header'
import Home from 'pages/Home/'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import { LinkType } from 'lib/types'
import APIDoc from 'pages/APIDoc'
import Footer from 'components/Footer'

function App() {
  const headerLinks: LinkType[] = [
    {
      component: Home,
      name: 'Home',
      path: '/'
    },
    {
      component: APIDoc,
      name: 'API Doc',
      path: '/api/v1/docs'
    },
    {
      component: Contacts,
      name: 'Contacts',
      path: '/contacts'
    }
  ]

  return (
    <>
      <Header title='TUT Bus Timetable API' navLists={headerLinks} />
      <MainContainer>
        <Router>
          {headerLinks.map(page => {
            return <Route exact key={page.path} path={page.path} component={page.component} />
          })}
        </Router>
      </MainContainer>
      <Footer />
    </>
  )
}

const MainContainer = styled(Container)`
  padding-top: 60px;
`

export default App
