import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'

const cx = classNames.bind(styles)

const Header = ({ pathname, newUser }) => (
  <header className={cx('header')}>
    <div className={cx('container')}>
      <div className={cx('logoA')}>
        <LogoIcon className={cx('logoIcon')} alt='logoIcon' />
      </div>
      <Link
        to='/'
        className={cx('addUserA', {
          activeIcon: pathname.indexOf('/users') !== 0 && pathname.indexOf('/user') !== 0
            && pathname.indexOf('/edit-user') !== 0 && !newUser.id,
        })}
      >
        <AddUserIcon className={cx('addUserIcon')} alt='addUserIcon' />
        <span className={cx('addUserSpan ')} >Add new user</span>
      </Link>
      <Link
        to='/users'
        className={cx('loginA', {
          activeIcon: pathname.indexOf('/users') === 0 || pathname.indexOf('/user') === 0
            || pathname.indexOf('/edit-user') === 0 || newUser.id,
        })}
      >
        <LoginIcon className={cx('loginIcon')} alt='loginIon' />
        <span className={cx('loginSpan ')}>List of users</span>
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  newUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { pathname } = state.router.location
  return {
    pathname,
    newUser: state.newUser,
  }
}

export default connect(
  mapStateToProps,
)(Header)
