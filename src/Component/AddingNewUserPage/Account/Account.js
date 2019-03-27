import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Account.scss'
import CloseIcon from '../../../img/icon/CloseIcon'
import UserAvatar from '../../../img/icon/UserAvatar'
import initialState from "../../../reducers/taskReducer";


const cx = classNames.bind(styles)


class Account extends Component {
  render() {
    const { accountPassword, repeatPassword } = this.props
    return (
      <Fragment>
        <div className={cx('windowNewUser__question')}>
          <span>You have an unsaved user data. Do you want to complete it?</span>
          <button className={cx('windowNewUser__continue')}>Continue</button>
          <button className={cx('windowNewUser__close')}><CloseIcon className={cx('closeIcon')}/></button>
        </div>
        <div className={cx('windowNewUser__register')}>
          <UserAvatar className={cx('userAvatar')}/>
          <div className={cx('register__userData')}>
            <span>User name</span>
            <input type="text" className={cx('register__userName')}/>
            <span>Password</span>
            <input type="text" className={cx('register__password')} value={accountPassword}/>
            <span>Repeat Password</span>
            <input type="text" className={cx('register__repeatPassword')} value={repeatPassword}/>
            <button type="submit">Forward</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

Account.propTypes = {}

const mapStateToProps = state => ({
  accountPassword: state.initialState.accountPassword,
  repeatPassword: state.initialState.repeatPassword,
})

export default connect(
  mapStateToProps,
)(Account)