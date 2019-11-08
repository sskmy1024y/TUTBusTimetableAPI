import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { RootState } from 'modules'
import thunkMiddleware from 'redux-thunk'
import { initialState } from 'modules'

export default function StorybookProvider({
  story,
  state: stateProp,
}: {
  story: React.ReactChild | (() => React.ReactChild)
  state?: RootState | (() => RootState)
}) {
  const children = typeof story === 'function' ? story() : story

  const mockStore = configureStore([thunkMiddleware])
  const state = {
    ...initialState,
    ...(typeof stateProp === 'function' ? stateProp() : stateProp),
  }
  const store = mockStore(state)

  return (
    <Provider store={store} key={Math.random()}>
      {children}
    </Provider>
  )
}
