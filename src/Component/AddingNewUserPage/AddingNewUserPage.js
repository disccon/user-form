import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './AddingNewUser.scss'
import Account from './Account/Account'
import Contacts from './Contacts/Contacts'
import Capabilities from './Capabilities/Capabilities'
import Profile from './Profile/Profile'
import { Redirect, Route, Switch } from 'react-router'


const cx = classNames.bind(styles)


class AddingNewUserPage extends Component {
  render() {
    const { pathname } = this.props.location
    const classAccount = pathname === '/' ? 'active' : null
    const classProfile = pathname === '/Profile' ? 'active' : null
    const classContacts = pathname === '/Contacts' ? 'active' : null
    const classCapabilities = pathname === '/Capabilities' ? 'active' : null
    return (
      <Fragment>
        <h2 className={cx('newUserH')}>Adding new user</h2>
        <div className={cx('windowNewUser')}>
          <div className={cx('windowNewUser__tabs')}>
            <div className={cx(`windowNewUser__tab ${classAccount}`)}>
              <h2>1. Account</h2>
            </div>
            <div className={cx(`windowNewUser__tab ${classProfile}`)}>
              <h2>2. Profile</h2>
            </div>
            <div className={cx(`windowNewUser__tab ${classContacts}`)}>
              <h2>3. Contacts</h2>
            </div>
            <div className={cx(`windowNewUser__tab ${classCapabilities}`)}>
              <h2>4. Capabilities</h2>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={Account} />
            <Route exact path='/Profile' component={Profile}/>
            <Route exact path='/Contacts' component={Contacts}/>
            <Route exact path='/Capabilities' component={Capabilities}/>
            <Redirect to='/NodFound' />
          </Switch>
        </div >
      </Fragment>
    )
  }
}

AddingNewUserPage.propTypes = {
}

const mapStateToProps = state => ({

})

export default connect(
  mapStateToProps,
)(AddingNewUserPage)