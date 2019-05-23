import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import { Redirect, Route, Switch } from 'react-router'
import { getFormNames, getFormValues } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './AddingNewUser.scss'
import Account from './account/Account'
import Contacts from './contacts/Contacts'
import Capabilities from './capabilities/Capabilities'
import Profile from './profile/Profile'
import db from '../../db'


const cx = classNames.bind(styles)

class AddingNewUserPage extends Component {
  componentDidMount() {
    const {
      pathname, push,
    } = this.props
    if (pathname === '/profile' || pathname === '/contacts' || pathname === '/capabilities') {
      push('/')
    }
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
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
            <Route exact path='/' component={Account} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/contacts' component={Contacts} />
            <Route exact path='/capabilities' component={Capabilities} />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

AddingNewUserPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  accountFilled: PropTypes.bool.isRequired,
  profileFilled: PropTypes.bool.isRequired,
  contactsFilled: PropTypes.bool.isRequired,
  activeFormValue: PropTypes.object,
  newUser: PropTypes.object,
  push: PropTypes.func.isRequired,
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
  { push },
)(AddingNewUserPage)
