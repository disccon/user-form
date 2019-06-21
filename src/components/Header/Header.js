import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'

const Header = ({ pathname, newUser }) => (
  <header className='header'>
    <div className='container'>
      <div className='logoA'>
        <LogoIcon className={cn('logoIcon')} alt='logoIcon' />
      </div>
      <Link
        to='/'
        className={cn('addUserA', {
          activeIcon: pathname.indexOf('/users') !== 0 && pathname.indexOf('/user') !== 0
            && pathname.indexOf('/edit-user') !== 0 && !newUser.id,
        })}
      >
        <AddUserIcon className='addUserIcon' alt='addUserIcon' />
        <span className='addUserSpan' >Add new user</span>
      </Link>
      <Link
        to='/users'
        className={cn('loginA', {
          activeIcon: pathname.indexOf('/users') === 0 || pathname.indexOf('/user') === 0
            || pathname.indexOf('/edit-user') === 0 || newUser.id,
        })}
      >
        <LoginIcon className='loginIcon' alt='loginIon' />
        <span className='loginSpan'>List of users</span>
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
