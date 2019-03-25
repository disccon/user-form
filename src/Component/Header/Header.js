import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Header.scss'
import LogoIcon from '../../img/icon/LogoIcon'
import AddUserIcon from '../../img/icon/AddUserIcon'
import LoginIcon from '../../img/icon/LoginIcon'
import AddingNewUser from '../AddingNewUser/AddingNewUser'


const cx = classNames.bind(styles)


class Header extends Component {
  render() {
    return (
    <Fragment>
        <header>
          <a className={cx('logoA')}><LogoIcon className={cx('logoIcon')} /></a>
          <a className={cx('addUserA')}><AddUserIcon className={cx('addUserIcon')} /><span>Add new user</span></a>
          <a className={cx('loginA')}><LoginIcon className={cx('loginIcon')} /><span>List of users</span></a>
        </header>
        <AddingNewUser/>
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