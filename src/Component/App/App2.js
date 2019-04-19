import React, { useState, useEffect } from 'react'
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
import { AddingNewUserPage } from '../AddingNewUserPage/AddingNewUserPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'

const cx = classNames.bind(styles)

function App2(props) {
  useEffect(() => {
    const { userListerNewState, pathname, continueUser } = props
    console.log(1111)
  })


  const { history } = props
  return (
    <ConnectedRouter history={history}>
      <div className={cx('container')}>
        <Header history={history} />
        <Switch>
          <Route path='/NodFound' component={NodFound} />
          <Route exact path='/ListUsers' component={ListUsersPage} />
          <Route exact path='/EditUser' component={EditUserPage} />
          <Route path='/' component={AddingNewUserPage} />
          <Redirect to='/NodFound' />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

App2.propTypes = {
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
)(App2)
