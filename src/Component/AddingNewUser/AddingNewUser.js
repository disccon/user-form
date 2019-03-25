import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './AddingNewUser.scss'
import Account from './Account/Account'
import Profile from "./Profile/Profile";


const cx = classNames.bind(styles)


class AddingNewUser extends Component {
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
          {/*<Account/>*/}
          <Profile/>
        </div >
      </Fragment>
    )
  }
}

AddingNewUser.propTypes = {
}

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
)(AddingNewUser)