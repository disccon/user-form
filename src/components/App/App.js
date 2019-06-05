import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import _ from 'lodash/core'
import './reset.css'
import styles from './App.scss'
import Header from '../Header/Header'
import { NotFound } from '../../pages/NotFound/NotFound'
import db from '../../db'
import { changeQuestionState } from '../../actions/actionNewUser'
import { initialNewUserState } from '../../stubs/initialNewUserState'
import UsersPage from '../../pages/UsersPage/UsersPage'
import UserPage from '../../pages/UserPage/UserPage'
import EditUserPage from '../../pages/EditUserPage/EditUserPage'
import CreateUserPage from '../../pages/CreateUserPage/CreateUserPage'

const cx = classNames.bind(styles)

class App extends Component {
  componentDidMount() {
    const { changeQuestionState } = this.props
    db.newUserDB.get(0, newUserDB => {
      if (newUserDB) {
        changeQuestionState(_.isEqual(newUserDB, initialNewUserState))
      }
    })
  }

  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <div className={cx('app')}>
          <Header />
          <Switch>
            <Route path='/not-found' component={NotFound} />
            <Route exact path='/users' component={UsersPage} />
            <Route exact path='/user/:id' component={UserPage} />
            <Route path='/edit-user/:id' component={EditUserPage} />
            <Route path='/' component={CreateUserPage} />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  changeQuestionState: PropTypes.func.isRequired,
}

export default connect(
  null,
  { changeQuestionState },
)(App)
