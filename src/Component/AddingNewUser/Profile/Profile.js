import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Profile.scss'



const cx = classNames.bind(styles)


class Profile extends Component {
  render() {
    return (
      <div className={cx('profile')}>
        <div className={cx('profile__sideLeft')}>
          <div className={cx('wrapperSpan')}>
            <span>First name</span>
            <span>*</span>
          </div>
          <input type="text" className={cx('profile__firstName')}/>
          <div className={cx('wrapperSpan')}>
            <span>Last name</span>
            <span>*</span>
          </div>
          <input type="text" className={cx('profile__lastName')} value="Morozov" />

          <div className={cx('wrapperSpan wrapperSpanDate')}>
            <span>Birth date</span>
            <span>*</span>
          </div>
          <input type="text" className={cx('profile__birthDate')} />
        </div>

        <div className={cx('profile__sideRight')}></div>
      </div >

    )
  }
}

Profile.propTypes = {
}

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
)(Profile)