import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import { getFormNames, getFormValues } from 'redux-form'
import NodFound from '../NodFound/NodFound'
import styles from './App.scss'
import Header from '../Header/Header'
import db from '../../db'
import { userListerNewState, continueUser } from '../../Actions'
import { users } from '../../stubs/users'

const cx = classNames.bind(styles)

class App extends Component {
  componentDidMount() {
    const { userListerNewState, pathname, continueUser } = this.props
    window.addEventListener('beforeunload', this.onUnload)
    db.table('newUserDB')
      .toArray()
      .then(newUserDB => {
        if (newUserDB.length === 1) {
          db.table('listUserDB')
            .toArray()
            .then(listUserDB => {
              userListerNewState(listUserDB)
            })
          if (pathname !== '/') {
            db.table('newUserDB')
              .toArray()
              .then(newUserDB => {
                continueUser(true, ...newUserDB)
              })
          }
        } else {
          userListerNewState(users)
        }
      })
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }

  onUnload = () => {
    const { newUser, listUsers, activeValue } = this.props
    db.table('newUserDB')
      .toArray()
      .then(newUserDB => {
        if (newUserDB.length === 1) {
          db.table('newUserDB')
            .update(1, { ...newUser, ...activeValue, id: 1 })
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
  activeValue: PropTypes.object,
  userListerNewState: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  continueUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const activeFormName = getFormNames()(state)
  const activeValue = getFormValues(...activeFormName)(state)
  const { pathname } = state.router.location
  return {
    newUser: state.newUser,
    listUsers: state.listUsers,
    activeValue,
    pathname,
  }
}

export default connect(
  mapStateToProps,
  { userListerNewState, continueUser },
)(App)
