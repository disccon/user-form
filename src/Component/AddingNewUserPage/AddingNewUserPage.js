import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './AddingNewUser.scss'
import Contacts from "./Contacts/Contacts";
import Capabilities from "./Capabilities/Capabilities";
import Account from "./Account/Account";
import initialState from "../../reducers/taskReducer";
import Profile from "./Profile/Profile";


const cx = classNames.bind(styles)


class AddingNewUserPage extends Component {
  render() {
    const { namePage } = this.props
    return (
      <Fragment>
        <h2 className={cx('newUserH')}>{namePage}</h2>
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
          <Account/>
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