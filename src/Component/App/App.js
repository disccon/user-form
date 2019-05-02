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
import { userListerNewState, changeQuestionState } from '../../Actions'
import { users } from '../../stubs/users'
import { deepEqual } from '../../helpers/deepEqual'
import { AddingNewUserPage } from '../AddingNewUserPage/AddingNewUserPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'

const cx = classNames.bind(styles)


class App extends Component {
  componentDidMount() {
    const {
      userListerNewState, pathname, newUser, history, changeQuestionState,
    } = this.props
    // if (pathname !== '/') {
    //   history.push('/')
    // }
    window.addEventListener('beforeunload', this.onUnload)
    db.table('newUserDB')
      .toArray()
      .then(newUserDB => {
        if (newUserDB.length === 1) {
          changeQuestionState(deepEqual(...newUserDB, newUser))
          db.table('listUserDB')
            .toArray()
            .then(listUserDB => {
              userListerNewState(listUserDB)
            })
        } else {
          userListerNewState(users)
          db.table('newUserDB')
            .add(newUser)
          users.forEach(item => {
            db.table('listUserDB')
              .add(item)
          })
        }
      })
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }

  onUnload = () => {
    const { newUser, activeValue } = this.props
    db.table('newUserDB')
      .update(1, { ...newUser, ...activeValue })
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
            <Route path='/' component={AddingNewUserPage} />
            <Route path='/:id' component={AddingNewUserPage} />
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
  activeValue: PropTypes.object,
  userListerNewState: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  changeQuestionState: PropTypes.func.isRequired,
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
  { userListerNewState, changeQuestionState },
)(App)
