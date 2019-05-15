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
import { NodFound } from '../NodFound/NodFound'

const cx = classNames.bind(styles)

export const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div className={cx('app')}>
      <Header />
      <Switch>
        <Route path='/NodFound' component={NodFound} />
        <Route exact path='/ListUsers' component={ListUsersPage} />
        <Route exact path='/EditUser/:id' component={EditUserPage} />
        <Route path='/Editing/:id' component={EditingPage} />
        <Route path='/' component={AddingNewUserPage} />
        <Redirect to='/NodFound' />
      </Switch>
    </div>
  </ConnectedRouter>
)

App.propTypes = {
  history: PropTypes.object.isRequired,
}
