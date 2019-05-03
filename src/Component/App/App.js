import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './reset.css'
import { Route, Switch, Redirect } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import classNames from 'classnames'
import NodFound from '../NodFound/NodFound'
import styles from './App.scss'
import Header from '../Header/Header'
import db from '../../db'
import { userListerNewState, changeQuestionState } from '../../Actions'
import { users } from '../../stubs/users'
import { deepEqual } from '../../helpers/deepEqual'
import AddingNewUserPage from '../AddingNewUserPage/AddingNewUserPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'
import { EditingPage } from '../EditingPage/EditingPage'

const cx = classNames.bind(styles)

class App extends Component {
  componentDidMount() {
    const {
      userListerNewState, pathname, newUser, history, changeQuestionState,
    } = this.props
    if (pathname !== '/') {
      history.push('/')
    }
    db.newUserDB.get(0, newUserDB => {
      if (newUserDB) {
        changeQuestionState(deepEqual(newUserDB, newUser))
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
            <Route path='/Editing/' component={EditingPage} />
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
  pathname: PropTypes.string.isRequired,
  changeQuestionState: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { pathname } = state.router.location
  return {
    newUser: state.newUser,
    listUsers: state.listUsers,
    pathname,
  }
}

export default connect(
  mapStateToProps,
  { userListerNewState, changeQuestionState },
)(App)
