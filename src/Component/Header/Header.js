import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'
import { createUser } from '../../Actions'

const cx = classNames.bind(styles)

class Header extends Component {
  forwardListUsers = () => {
    const { history, pathname } = this.props
    if (pathname !== '/ListUsers') {
      history.push('/ListUsers')
    }
  }

  render() {
    const { createUser, pathname, newUser } = this.props
    return (
      <header>
        <div className={cx('containerTable')}>
          <div className={cx('logoA')}>
            <LogoIcon className={cx('logoIcon')} alt='logoIcon' />
          </div>
          <div
            className={cx('addUserA', { activeIcon: pathname !== '/ListUsers' && pathname.indexOf('/EditUser') !== 0 && !newUser.idList })}
            onClick={createUser}
          >
            <AddUserIcon className={cx('addUserIcon')} alt='addUserIcon ' />
            <span>Add new user</span>
          </div>
          <div
            className={cx('loginA', { activeIcon: pathname === '/ListUsers' || pathname.indexOf('/EditUser') === 0 || newUser.idList })}
            onClick={this.forwardListUsers}
          >
            <LoginIcon className={cx('loginIcon')} alt='loginIon' />
            <span>List of users</span>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  createUser: PropTypes.func.isRequired,
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
  { createUser },
)(Header)
