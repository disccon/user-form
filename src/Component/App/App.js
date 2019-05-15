import React from 'react'
import PropTypes from 'prop-types'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import styles from './App.scss'
import AddingNewUserPage from '../AddingNewUserPage/AddingNewUserPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'
import EditingPage from '../EditingPage/EditingPage'
import Header from '../Header/Header'
import { NotFound } from '../NotFound/NotFound'


const cx = classNames.bind(styles)

export const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className={cx('app')}>
      <Header />
      <Switch>
        <Route path='/not-found' component={NotFound} />
        <Route exact path='/users' component={ListUsersPage} />
        <Route exact path='/user/:id' component={EditUserPage} />
        <Route path='/edit-user/:id' component={EditingPage} />
        <Route path='/' component={AddingNewUserPage} />
        <Redirect to='/not-found' />
      </Switch>
    </div>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object.isRequired,
}
