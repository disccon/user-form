import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Redirect, Route, Switch } from 'react-router'
import styles from './AddingNewUser.scss'
import Account from './Account/Account'
import Contacts from './Contacts/Contacts'
import Capabilities from './Capabilities/Capabilities'
import Profile from './Profile/Profile'


const cx = classNames.bind(styles)


export const AddingNewUserPage = ({ location }) => {
  const { pathname } = location
  return (
    <Fragment>
      <h2 className={cx('newUserH')}>Adding new user</h2>
      <div className={cx('windowNewUser container')}>
        <div className={cx('windowNewUser__tabs')}>
          <div className={cx('windowNewUser__tab', {
            activeTab: pathname.includes === '/'
              || pathname.charAt(pathname.length - 2) >= 0,
          })}
          >
            <h2 className={cx('windowNewUser__h2')} >1. Account</h2>
          </div>
          <div className={cx('windowNewUser__tab', { activeTab: pathname.includes('/Profile') })}>
            <h2 className={cx('windowNewUser__h2')} >2. Profile</h2>
          </div>
          <div className={cx('windowNewUser__tab', { activeTab: pathname.includes('/Contacts') })}>
            <h2 className={cx('windowNewUser__h2')} >3. Contacts</h2>
          </div>
          <div className={cx('windowNewUser__tab', { activeTab: pathname.includes('/Capabilities') })}>
            <h2 className={cx('windowNewUser__h2')} >4. Capabilities</h2>
          </div>
        </div>
        <Switch>
          <Route exact path='/' component={Account} />
          <Route exact path='/Profile' component={Profile} />
          <Route exact path='/Contacts' component={Contacts} />
          <Route exact path='/Capabilities' component={Capabilities} />

          <Route exact path='/:id/' component={Account} />
          <Route exact path='/:id/Profile' component={Profile} />
          <Route exact path='/:id/Contacts' component={Contacts} />
          <Route exact path='/:id/Capabilities' component={Capabilities} />
          <Redirect to='/NodFound' />
        </Switch>
      </div>
    </Fragment>
  )
}

AddingNewUserPage.propTypes = {
  location: PropTypes.object.isRequired,
}
