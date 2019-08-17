import React from 'react'

import Header, { LinkProps } from './components/Header'
import Home from './pages/Home/'

import './App.css'

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

      <Home />
    </>
  )
}

export default App
