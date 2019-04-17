import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import NodFound from '../NodFound/NodFound'
import styles from './App.scss'
import { Header } from '../Header/Header'
import db from '../../db'
import { getFormNames, getFormValues } from 'redux-form'


const cx = classNames.bind(styles)


class App extends Component {
  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload)
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }

  onUnload = () => {
    const { newUser, listUsers, activeValue } = this.props
    db.table('newUserDB')
      .toArray()
      .then((newUserDB) => {
        if (newUserDB.length === 1) {
          db.table('newUserDB')
            .update(1, { ...activeValue })
        } else {
          db.table('newUserDB')
            .add(newUser)
          listUsers.users.forEach(item => {
            db.table('listUserDB')
              .add(item)
          })
        }
      })
  }

  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <div className={cx('container')} onClick={this.onUnload}>
          <Switch>
            <Route path='/NodFound' component={NodFound} />
            <Route path='/' component={Header} />
            <Redirect to='/NodFound' />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

App.propTypes = {
  newUser: PropTypes.object.isRequired,
  listUsers: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { pathname } = state.router.location
  let activeFormName

  // const activeFormName = getFormNames()(state)
  console.log(111111,diiss)
  if(pathname === '/'){
    activeFormName = 'Account'
  } else if (pathname === '/Profile'){
    activeFormName = '/Profile'
  } else if (pathname === '/Contacts'){
    activeFormName = '/Contacts'
  } else if (pathname === '/Capabilities'){
    activeFormName = '/Contacts'
  }
  const activeValue = getFormValues(activeFormName)(state)
  return {
  newUser: state.newUser,
  listUsers: state.listUsers,
  activeValue,
}}

export default connect(
  mapStateToProps,
)(App)
