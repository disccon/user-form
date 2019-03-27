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


// import { openDB, deleteDB, wrap, unwrap } from 'idb'
// import * as idb from 'idb'

// demo()
// async function demo() {
//   const db = await openDB('Articles', 1, {
//     upgrade(db) {
//       // Create a store of objects
//       const store = db.createObjectStore('articles', {
//         // The 'id' property of the object will be the key.
//         keyPath: 'id',
//         // If it isn't explicitly set, create a value by auto incrementing.
//         autoIncrement: true,
//       });
//       // Create an index on the 'date' property of the objects.
//       store.createIndex('date', 'date');
//     },
//   });
//
//   // Add an article:
//   await db.add('articles', {
//     title: 'Article 1',
//     date: new Date('2019-01-01'),
//     body: '…',
//   });
//
//   // Add multiple articles in one transaction:
//   {
//     const tx = db.transaction('articles', 'readwrite');
//     tx.store.add({
//       title: 'Article 2',
//       date: new Date('2019-01-01'),
//       body: '…',
//     });
//     tx.store.add({
//       title: 'Article 3',
//       date: new Date('2019-01-02'),
//       body: '…',
//     });
//     await tx.done;
//   }
//
//   // Get all the articles in date order:
//   console.log(await db.getAllFromIndex('articles', 'date'));
//
//   // Add 'And, happy new year!' to all articles on 2019-01-01:
//   {
//     const tx = db.transaction('articles', 'readwrite');
//     const index = tx.store.index('date');
//
//     for await (const cursor of index.iterate(new Date('2019-01-01'))) {
//       const article = { ...cursor.value };
//       article.body += ' And, happy new year!';
//       cursor.update(article);
//     }
//
//     await tx.done;
//   }
// }




// var db
// const customerData = [
//   { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//   { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
//   { ssn: "666-66-666", name: "Nick", age: 45, email: "donna@home.org" },
// ];
// const dbName = "the_name";
//
// var request = indexedDB.open(dbName, 2);
//
// request.onerror = function(event) {
//   // Handle errors.
// };
//
// var transaction
// request.onupgradeneeded = function(event) {
//   db = event.target.result;
//   transaction = db.transaction(["customers"]);
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
// }
// setTimeout(function() {
//
//
//   var objectStore = transaction.objectStore("customers");
//   var request = objectStore.get("444-44-4444");
//   request.onerror = function(event) {
//     // Handle errors!
//   };
//   request.onsuccess = function(event) {
//     // Do something with the request.result!
//     alert("Name for SSN 444-44-4444 is " + request.result.name);
//   };
// }, 1000);
