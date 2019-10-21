import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { faBus, faCalendarAlt, faClock, faSearch, faStar, faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App'
import store from './configureStore'

import * as serviceWorker from './serviceWorker'

const importIcons = [faBus, faSearch, faStar, faCalendarAlt, faClock, faTimes, faEnvelope]
library.add(...importIcons)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
