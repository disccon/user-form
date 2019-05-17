import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import _ from 'lodash/core'
import './reset.css'
import styles from './App.scss'
import AddingNewUserPage from '../AddingNewUserPage/AddingNewUserPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import UsersPage from '../UsersPage/UsersPage'
import EditingPage from '../EditingPage/EditingPage'
import Header from '../Header/Header'
import { NotFound } from '../NotFound/NotFound'
import db from '../../db'
import { changeQuestionState } from '../../Actions'


const cx = classNames.bind(styles)

class App extends Component {
  componentDidMount() {
    const { newUser, changeQuestionState } = this.props
    db.newUserDB.get(0, newUserDB => {
      if (newUserDB) {
        changeQuestionState(_.isEqual(newUserDB, newUser))
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
            <Route exact path='/user/:id' component={EditUserPage} />
            <Route path='/edit-user/:id' component={EditingPage} />
            <Route path='/' component={AddingNewUserPage} />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </ConnectedRouter>
    )
  }
}

App.propTypes = {
  newUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeQuestionState: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    newUser: state.newUser,
  }),
  { changeQuestionState },
)(App)
