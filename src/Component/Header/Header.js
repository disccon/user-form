import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router'
import classNames from 'classnames'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'
import { AddingNewUserPage } from '../AddingNewUserPage/AddingNewUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'
import EditUserPage from '../EditUserPage/EditUserPage'


const cx = classNames.bind(styles)

export class Header extends Component {
  forwardAccount = () => {
    const { history } = this.props
    const { pathname } = history.location
    if (pathname !== '/' && pathname !== '/Profile' && pathname !== '/Contacts' && pathname !== '/Capabilities') {
      history.push('/')
    }
  }

  forwardListUsers = () => {
    const { history } = this.props
    const { pathname } = history.location
    if (pathname !== '/ListUsers') {
      history.push('/ListUsers')
    }
  }

  render() {
    return (
      <Fragment>
        <header>
          <div className={cx('logoA')}>
            <LogoIcon className={cx('logoIcon')} alt='logoIcon' onClick={this.forwardAccount} />
          </div>
          <div className={cx('addUserA')} onClick={this.forwardAccount}>
            <AddUserIcon className={cx('addUserIcon')} alt='addUserIcon' />
            <span>Add new user</span>
          </div>
          <div className={cx('loginA')} onClick={this.forwardListUsers}>
            <LoginIcon className={cx('loginIcon')} alt='loginIcon' />
            <span>List of users</span>
          </div>
        </header>
        <Switch>
          <Route exact path='/ListUsers' component={ListUsersPage} />
          <Route exact path='/EditUser' component={EditUserPage} />
          <Route path='/' component={AddingNewUserPage} />
          <Redirect to='/NodFound' />
        </Switch>
      </Fragment>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
}
