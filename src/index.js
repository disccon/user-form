import React from 'react'
import { render } from 'react-dom'
import './fonts/fonts.css'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import rootSaga from './saga'
import rootReducer from './reducers'
import App from './components/app/App'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer(history),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      logger,
    ),
  ),
)

sagaMiddleware.run(rootSaga)
window.store = store

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementsByClassName('root')[0],
)
