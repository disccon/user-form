import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'
import { createUser } from '../../Actions'
import db from '../../db'

const cx = classNames.bind(styles)

class Header extends Component {
  state = {
    lengthListUsersPage: [],
  }

  componentDidMount() {
    const { perPage } = this.props
    db.listUserDB.toArray(users => {
      this.setState({
        lengthListUsersPage: Math.ceil(users.length / perPage),
      })
    })
  }

  render() {
    const { createUser, pathname, newUser } = this.props
    const { lengthListUsersPage } = this.state
    return (
      <header className={cx('header')}>
        <div className={cx('container')}>
          <div className={cx('logoA')}>
            <LogoIcon className={cx('logoIcon')} alt='logoIcon' />
          </div>
          <Link
            to='/'
            className={cx('addUserA', {
              activeIcon: pathname.indexOf('/ListUsers') !== 0 && pathname.indexOf('/EditUser') !== 0 && !newUser.id,
            })}
            onClick={createUser}
          >
            <AddUserIcon className={cx('addUserIcon')} alt='addUserIcon' />
            <span className={cx('addUserSpan ')}>Add new user</span>
          </Link>
          <Link
            to={{ pathname: '/ListUsers', search: `?page=1&per_page=${lengthListUsersPage}` }}
            className={cx('loginA', {
              activeIcon: pathname.indexOf('/ListUsers') === 0 || pathname.indexOf('/EditUser') === 0 || newUser.id,
            })}
          >
            <LoginIcon className={cx('loginIcon')} alt='loginIon' />
            <span className={cx('loginSpan ')}>List of users</span>
          </Link>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  createUser: PropTypes.func.isRequired,
  newUser: PropTypes.object.isRequired,
  perPage: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
  const { pathname } = state.router.location
  const { perPage } = state.listUsers
  return {
    pathname,
    newUser: state.newUser,
    perPage,
  }
}

export default connect(
  mapStateToProps,
  { createUser },
)(Header)
