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
import App from './Component/App/App'
import rootReducer from './reducers'


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
  document.getElementsByClassName('app')[0],
)
//
// const customerData = [
//   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
// ];
// const dbName = "the_name";
//
// var request = indexedDB.open(dbName, 2);
//
// request.onerror = function(event) {
//   // Handle errors.
// };
// request.onupgradeneeded = function(event) {
//   var db = event.target.result;
//
//   // Create an objectStore to hold information about our customers. We're
//   // going to use "ssn" as our key path because it's guaranteed to be
//   // unique.
//   var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });
//
//   // Create an index to search customers by name. We may have duplicates
//   // so we can't use a unique index.
//   objectStore.createIndex("name", "name", { unique: false });
//
//   // Create an index to search customers by email. We want to ensure that
//   // no two customers have the same email, so use a unique index.
//   objectStore.createIndex("email", "email", { unique: true });
//
//   // Store values in the newly created objectStore.
//   for (var i in customerData) {
//     objectStore.add(customerData[i]);
//   }
// };




// let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
//
// let open = indexedDB.open('db-name', 1)
//
// open.onupgradeneeded = function() {
//   let db = open.result
//   db.createObjectStore('objectStoreName', { autoIncrement: true })
// }
//
// open.onsuccess = function() {
//   let db = open.result
//   let tx = db.transaction('objectStoreName', 'readwrite')
//   let store = tx.objectStore('objectStoreName')
//
//   store.put({ firstname: 'John', lastname: 'Doe', age: 33 })
//
//   tx.oncomplete = function() {
//     db.close()
//   }
// }
