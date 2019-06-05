import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Redirect, Route, Switch } from 'react-router'
import { push } from 'connected-react-router'
import { getFormNames, getFormValues } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './CreateUserPage.scss'
import db from '../../db'
import { clearUser } from '../../actions/actionNewUser'
import CreateUserAccount from './CreateUserAccount/CreateUserAccount'
import CreateUserProfile from './CreateUserProfile/CreateUserProfile'
import CreateUserContacts from './CreateUserContacts/CreateUserContacts'
import CreateUserCapabilities from './CreateUserCapabilities/CreateUserCapabilities'

const cx = classNames.bind(styles)

class CreateUserPage extends Component {
  componentDidMount() {
    const { pathname, push } = this.props
    if (pathname === '/profile' || pathname === '/contacts' || pathname === '/capabilities') {
      push('/')
    }
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount() {
    const { clearUser } = this.props
    window.removeEventListener('beforeunload', this.onUnload)
    setTimeout(() => {
      clearUser()
    }, 100)
  }

  onUnload = () => {
    const { newUser, activeFormValue } = this.props
    db.newUserDB.update(0, { ...newUser, ...activeFormValue, isQuestion: false })
  }

  render() {
    const {
      pathname, accountFilled, profileFilled, contactsFilled,
    } = this.props
    return (
      <Fragment>
        <h2 className={cx('headline')}>Adding new user</h2>
        <div className={cx('windowNewUser container')}>
          <div className={cx('windowNewUser__tabs')}>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/' })}>
              <Link
                to='/'
                className={cx('windowNewUser__link',
                  { activeLink: pathname !== '/' })}
              >
                1. Account
              </Link>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/profile' })}>
              <Link
                to='/profile'
                className={cx('windowNewUser__link',
                  { activeLink: accountFilled && pathname !== '/profile' })}
              >
                2. Profile
              </Link>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/contacts' })}>
              <Link
                to='/contacts'
                className={cx('windowNewUser__link',
                  { activeLink: profileFilled && pathname !== '/contacts' })}
              >
                3. Contacts
              </Link>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/capabilities' })}>
              <Link
                to='/capabilities'
                className={cx('windowNewUser__link',
                  { activeLink: contactsFilled && pathname !== '/capabilities' })}
              >
                4. Capabilities
              </Link>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={CreateUserAccount} />
            <Route exact path='/profile' component={CreateUserProfile} />
            <Route exact path='/contacts' component={CreateUserContacts} />
            <Route exact path='/capabilities' component={CreateUserCapabilities} />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

CreateUserPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  accountFilled: PropTypes.bool.isRequired,
  profileFilled: PropTypes.bool.isRequired,
  contactsFilled: PropTypes.bool.isRequired,
  activeFormValue: PropTypes.object,
  newUser: PropTypes.object,
  push: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    accountFilled, profileFilled, contactsFilled,
  } = state.newUser
  const activeFormName = getFormNames()(state)
  const activeFormValue = getFormValues(activeFormName[0])(state)
  const { pathname } = state.router.location
  return {
    newUser: state.newUser,
    activeFormValue,
    pathname,
    accountFilled,
    profileFilled,
    contactsFilled,
  }
}

export default connect(
  mapStateToProps,
  { push, clearUser },
)(CreateUserPage)
