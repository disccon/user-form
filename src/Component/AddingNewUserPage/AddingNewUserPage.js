import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './AddingNewUser.scss'
import Account from './Account/Account'
import Contacts from "./Contacts/Contacts";
import Capabilities from "./Capabilities/Capabilities";

import initialState from "../../reducers/userSaveReducer";
import Profile from "./Profile/Profile";
import { Redirect, Route, Switch } from "react-router";


const cx = classNames.bind(styles)


class AddingNewUserPage extends Component {
  render() {
    return (
      <Fragment>
        <h2 className={cx('newUserH')}>Adding new user</h2>
        <div className={cx('windowNewUser')}>
          <div className={cx('windowNewUser__tabs')}>
            <div className={cx('windowNewUser__tab active')}>
              <h2>1. Account</h2>
            </div>
            <div className={cx('windowNewUser__tab')}>
              <h2>2. Profile</h2>
            </div>
            <div className={cx('windowNewUser__tab')}>
              <h2>3. Contacts</h2>
            </div>
            <div className={cx('windowNewUser__tab')}>
              <h2>4. Capabilities</h2>
            </div>
          </div>
          <Switch>
            <Route exact path='/' component={Profile}/>
            {/*<Route exact path='/' component={Account} />*/}
            {/*<Route exact path='/Profile' component={Profile}/>*/}
            <Redirect to='/NodFound' />
          </Switch>
          {/*<Profile/>*/}
          {/*<Contacts/>*/}
          {/*<Capabilities/>*/}
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