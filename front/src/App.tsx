import React from 'react'

import logo from './logo.svg'

import Header from './components/Header'
import Home from './pages/Home/'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
        <Home name='test' />
      </div>
    </>
  )
}

export default App
