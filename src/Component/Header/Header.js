import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'
import AddingNewUserPage from '../AddingNewUserPage/AddingNewUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'
import UserNamePage from "../UserNamePage/UserNamePage";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from 'react-router'
import NodFound from "../NodFound/NodFound";


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
          <Route path='/AddingNewUser' component={AddingNewUserPage} />
          <Route path='/NodFound' component={NodFound} />
          {/*<Route path='/' component={ContainerTable} />*/}
          <Redirect to='/NodFound' />
        </Switch>
        <AddingNewUserPage/>
        {/*<ListUsersPage/>*/}
        {/*<UserNamePage/>*/}
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