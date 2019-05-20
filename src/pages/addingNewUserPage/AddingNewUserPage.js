import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import { Redirect, Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import styles from './AddingNewUser.scss'
import Account from './account/Account'
import Contacts from './contacts/Contacts'
import Capabilities from './capabilities/Capabilities'
import Profile from './profile/Profile'

const cx = classNames.bind(styles)

class AddingNewUserPage extends Component {
  componentDidMount() {
    const {
      pathname, push,
    } = this.props
    if (pathname !== '/') {
      push('/')
    }
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
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/profile' })}>
              <h2 className={cx('windowNewUser__h2')}>2. Profile</h2>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/contacts' })}>
              <h2 className={cx('windowNewUser__h2')}>3. Contacts</h2>
            </div>
            <div className={cx('windowNewUser__tab', { activeTab: pathname === '/capabilities' })}>
              <h2 className={cx('windowNewUser__h2')}>4. Capabilities</h2>
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
  push: PropTypes.func.isRequired,
}

export default connect(
  state => ({ pathname: state.router.location.pathname }),
  { push },
)(AddingNewUserPage)
