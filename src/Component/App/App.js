import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import _ from 'lodash/core'
import NodFound from '../NodFound/NodFound'
import styles from './App.scss'
import db from '../../db'
import { userListerNewState, changeQuestionState } from '../../Actions'
import { users } from '../../stubs/users'
import AddingNewUserPage from '../AddingNewUserPage/AddingNewUserPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'
import EditingPage from '../EditingPage/EditingPage'
import Header from '../Header/Header'


const cx = classNames.bind(styles)

class App extends Component {
  componentDidMount() {
    const {
      userListerNewState, newUser, changeQuestionState,
    } = this.props
    db.newUserDB.get(0, newUserDB => {
      if (newUserDB) {
        changeQuestionState(_.isEqual(newUserDB, newUser))
        db.listUserDB.toArray(listUserDB => {
          userListerNewState(listUserDB)
        })
      } else {
        userListerNewState(users)
        db.newUserDB.add(newUser)
        users.forEach(item => {
          db.listUserDB.add(item)
        })
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
  }
}

App.propTypes = {
  newUser: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userListerNewState: PropTypes.func.isRequired,
  changeQuestionState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  newUser: state.newUser,
  listUsers: state.listUsers,
})

export default connect(
  mapStateToProps,
  { userListerNewState, changeQuestionState },
)(App)
