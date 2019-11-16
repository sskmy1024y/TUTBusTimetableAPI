import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import {
  faBus,
  faCalendarAlt,
  faChevronRight,
  faClock,
  faEnvelope,
  faSearch,
  faStar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import App from './App'
import store from './configureStore'

import * as serviceWorker from './serviceWorker'

const importIcons = [
  faSearch,
  faStar,
  faCalendarAlt,
  faClock,
  faTimes,
  faEnvelope,
  faChevronRight,
  faTwitter,
  faFacebookF,
]
library.add(...importIcons)

if (process.env.NODE_ENV === 'development') {
  window['ga-disable-GA_TRACKING_ID'] = true
}

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
