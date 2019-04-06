import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import classNames from 'classnames'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'
import AddingNewUserPage from '../AddingNewUserPage/AddingNewUserPage'
import ListUsersPage from "../ListUsersPage/ListUsersPage";

const cx = classNames.bind(styles)

class Header extends Component {
  render() {
    return (
        <Fragment>
          <header>
            <a className={cx('logoA')}><LogoIcon className={cx('logoIcon')} alt='logoIcon'/></a>
            <a className={cx('addUserA')}><AddUserIcon className={cx('addUserIcon')} alt='addUserIcon'/><span>Add new user</span></a>
            <a className={cx('loginA')}><LoginIcon className={cx('loginIcon')} alt='loginIcon'/><span>List of users</span></a>
          </header>
          <Switch>
            <Route exact path='/' component={AddingNewUserPage} />
            <Route exact path='/ListUsers' component={ListUsersPage} />
            <Redirect to='/NodFound' />
          </Switch>
        </Fragment>
    )
  }
}

Header.propTypes = {
}

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
)(Header)