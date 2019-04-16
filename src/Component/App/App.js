import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import './reset.css'
import {Route, Switch, Redirect} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'
import NodFound from '../NodFound/NodFound'
import classNames from 'classnames'
import styles from './App.scss'
import Header from '../Header/Header'

const cx = classNames.bind(styles)
export const dbName = 'dbName'
export let dbVersion = 1;

class App extends Component {
    // componentDidMount() {
    //     const {newUser, listUsers} = this.props
    //
    //     let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    //
    //     if (!indexedDB) {
    //         window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны")
    //     } else {
    //         let stateRedux = indexedDB.open(dbName)
    //
    //         stateRedux.onerror = function (event) {
    //             // Handle errors.
    //             console.log('stateRedux.onerror')
    //         }
    //
    //         stateRedux.onsuccess=function(e){
    //             var db = e.target.result;
    //
    //             // var transaction = db.transaction(['listUsers'],'readonly')
    //             // var objectStore = transaction.objectStore('listUsers')
    //             // var entry = objectStore.get('email')
    //             //
    //             // entry.onerror = function(e) {
    //             //     console.log('error');
    //             //     console.log(e.target.result);
    //             //     console.log(e);
    //             // };
    //             // entry.onsuccess = function(e) {
    //             //     console.log('success');
    //             //     console.log(e.target.result);
    //             //     console.log(e);
    //             // };
    //         }
    //
    //
    //         stateRedux.onupgradeneeded = function (event) {
    //             let db = event.target.result
    //             let objectStoreListUsers = db.createObjectStore("listUsers", {keyPath: "id"})
    //             let objectStoreNewUser = db.createObjectStore("newUser", {keyPath: "id"})
    //
    //             for (let i in listUsers) {
    //                 objectStoreListUsers.add(listUsers[i]);
    //             }
    //             // objectStoreListUsers.createIndex("email", "email", { unique: true })
    //             // objectStoreListUsers.createIndex("address", "address", { unique: true })
    //             //
    //             // objectStoreListUsers.createIndex("facebookLink", "facebookLink", { unique: true })
    //             // objectStoreListUsers.createIndex("githubLink", "githubLink", { unique: true })
    //             //
    //             // objectStoreListUsers.createIndex("fax", "fax", { unique: true })
    //             // objectStoreListUsers.createIndex("phoneN1", "phoneN1", { unique: true })
    //             objectStoreNewUser.add(newUser)
    //         }
    //
    //     }
    // }

    render() {
        const {history} = this.props
        return (
            <ConnectedRouter history={history}>
                <div className={cx('container')}>
                    <Switch>
                        <Route path='/NodFound' component={NodFound}/>
                        <Route path='/' component={Header}/>
                        <Redirect to='/NodFound'/>
                    </Switch>
                </div>
            </ConnectedRouter>
        )
    }
}

App.propTypes = {
    newUser: PropTypes.object.isRequired,
    listUsers: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    newUser: state.newUser,
    listUsers: state.listUsers,
})

export default connect(
    mapStateToProps,
)(App)
