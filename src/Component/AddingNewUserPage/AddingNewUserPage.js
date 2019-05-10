import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import { Redirect, Route, Switch } from 'react-router'
import { getFormNames, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import styles from './AddingNewUser.scss'
import Account from './Account/Account'
import Contacts from './Contacts/Contacts'
import Capabilities from './Capabilities/Capabilities'
import Profile from './Profile/Profile'
import db from '../../db'

const cx = classNames.bind(styles)

class AddingNewUserPage extends Component {
  componentDidMount() {
    const { pathname, push } = this.props
    if (pathname !== '/') {
      push('/')
    }
    window.addEventListener('beforeunload', this.onUnload)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload)
  }

  onUnload = () => {
    const { newUser, activeValue } = this.props
    db.newUserDB.update(0, { ...newUser, ...activeValue, isQuestion: false })
  }

  render() {
    const { pathname } = this.props
    return (
      <Fragment>
        <h2 className={cx('headline')}>Adding new user</h2>
        <div className={cx('windowNewUser container')}>
          <div className={cx('windowNewUser__tabs')}>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/' })}>
              <h2 className={cx('windowNewUser__h2')}>1. Account</h2>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/Profile' })}>
              <h2 className={cx('windowNewUser__h2')}>2. Profile</h2>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/Contacts' })}>
              <h2 className={cx('windowNewUser__h2')}>3. Contacts</h2>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/Capabilities' })}>
              <h2 className={cx('windowNewUser__h2')}>4. Capabilities</h2>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={Account} />
            <Route exact path='/Profile' component={Profile} />
            <Route exact path='/Contacts' component={Contacts} />
            <Route exact path='/Capabilities' component={Capabilities} />
            <Redirect to='/NodFound' />
          </Switch>
        </div>
      </Fragment>
    )
  }
}

AddingNewUserPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  activeValue: PropTypes.object,
  newUser: PropTypes.object,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const activeFormName = getFormNames()(state)
  const activeValue = getFormValues(...activeFormName)(state)
  const { pathname } = state.router.location
  return {
    newUser: state.newUser,
    activeValue,
    pathname,
  }
}

export default connect(
  mapStateToProps,
  { push },
)(AddingNewUserPage)
