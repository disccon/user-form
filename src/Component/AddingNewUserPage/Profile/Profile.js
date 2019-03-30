import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Profile.scss'
import { reduxForm, Field } from 'redux-form';

const cx = classNames.bind(styles)

const renderFieldInput = ({ label, input, type, meta: { touched, error }, }) => (
  <label>
    <h4>{label}</h4>
    <div>
      <input {...input} type={type}/>
      {touched && error && <p className={cx('register__error')}>{error}</p>}
    </div>
  </label>
)


class Profile extends Component {
  render() {
    return (
      <div className={cx('profile')}>
        <form className={cx('profile__form')}>
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
            <input type="text" className={cx('profile__lastName')} value="Morozov"/>
            <div className={cx('wrapperSpan wrapperSpanDate')}>
              <span>Birth date</span>
              <span>*</span>
            </div>
            <input type="text" className={cx('profile__birthDate')}/>
          </div>
          <div className={cx('profile__sideRight')}>
            <div className={cx('wrapperSpan')}>
              <span>Email</span>
              <span>*</span>
            </div>
            <input type="text" className={cx('profile__email')}/>
            <div className={cx('wrapperSpan')}>
              <span>Address</span>
              <span>*</span>
            </div>
            <input type="text" className={cx('profile__address')}/>
            <span>Gender</span>
            <div className={cx('wrapperGender')}>
              <input type="radio" name="Gender" value="Male" checked/>
              <label htmlFor="radioGender">Male</label>
              <input type="radio" name="Gender" value="Male"/>
              <label htmlFor="contactChoice1">Email</label>
            </div>
            <div className={cx('wrapperButton')}>
              <button className={cx('profile__back')}>Back</button>
              <button className={cx('profile__forward')}>Forward</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Profile.propTypes = {}

const mapStateToProps = state => ({})

// export default connect(
//   mapStateToProps,
// )(Profile)


export default reduxForm({
  validate: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    return errors;
  },
  form: 'Profile',
})(Profile)
