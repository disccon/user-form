import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import styles from './Profile.scss'
import { forwardBackProfile } from '../../../Actions'
import { renderFieldInputProfile } from './renderFieldInputProfile'
import { renderFieldRadioProfile } from './renderFieldRadioProfile'
import { renderDateTimePickerProfile } from './renderDateTimePickerProfile'

const cx = classNames.bind(styles)


class Profile extends Component {
    onSubmit = values => {
      const { forwardBackProfile } = this.props
      forwardBackProfile('forward', values.firstName, values.lastName, values.birthDate, values.email, values.address, values.gender)
    }

    backProfile = () => {
      const {
        firstNameForm, lastNameForm, birthDateForm, emailForm, addressForm, forwardBackProfile, maleGender,
      } = this.props
      forwardBackProfile('back', firstNameForm, lastNameForm, birthDateForm, emailForm, addressForm, maleGender)
    }

    render() {
      const { handleSubmit } = this.props
      return (
        <div className={cx('profile')}>
          <form className={cx('profile__form')} onSubmit={handleSubmit(this.onSubmit)}>
            <div className={cx('profile__sideLeft')}>
              <Field
                component={renderFieldInputProfile}
                type='text'
                label='First name'
                name='firstName'
                idField='fieldFirstName'
              />
              <Field
                component={renderFieldInputProfile}
                type='text'
                label='Last name'
                name='lastName'
                idField='fieldLastName'
              />
              <Field name='birthDate' component={renderDateTimePickerProfile} />
            </div>
            <div className={cx('profile__sideRight')}>
              <Field
                component={renderFieldInputProfile}
                type='text'
                label='Email'
                name='email'
                idField='fieldEmail'
              />
              <Field
                component={renderFieldInputProfile}
                type='text'
                label='Address'
                name='address'
                idField='fieldAddress'
              />
              <h5>Gender</h5>
              <div className={cx('wrapperGender')}>
                <Field
                  component={renderFieldRadioProfile}
                  type='radio'
                  label='Male'
                  name='gender'
                  value='male'
                  idField='fieldGender'
                />
                <Field
                  component={renderFieldRadioProfile}
                  type='radio'
                  label='Female'
                  name='gender'
                  value='female'
                  idField='fieldGender'
                />
              </div>
              <div className={cx('wrapperButton')}>
                <button type='button' onClick={this.backProfile} className={cx('profile__back')}>
Back
                </button>
                <button type='submit' className={cx('profile__forward')}>Forward</button>
              </div>
            </div>
          </form>
        </div>
      )
    }
}

Profile.propTypes = {
  firstNameForm: PropTypes.string,
  lastNameForm: PropTypes.string,
  birthDateForm: PropTypes.string,
  emailForm: PropTypes.string,
  addressForm: PropTypes.string,
  maleGender: PropTypes.string,
  userEmailList: PropTypes.array,
  forwardBackProfile: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


Profile = reduxForm({
  validate: (values, props) => {
    const errors = {}
    const { userEmailList } = props
    if (!values.birthDate) {
      errors.birthDate = 'Missing Birth Date'
    } else if ((new Date().getFullYear() - values.birthDate.getFullYear()) < 18) {
      errors.birthDate = 'Sorry, you must be at least 18 years old'
    }

    if (!values.gender) {
      errors.gender = 'Missing Gender'
    }

    if (!values.firstName) {
      errors.firstName = 'Missing First name'
    } else if (values.firstName.length <= 2) {
      errors.firstName = 'Must be 3 characters or more'
    }
    if (!values.lastName) {
      errors.lastName = 'Missing Last name'
    } else if (values.lastName.length <= 2) {
      errors.lastName = 'Must be 3 characters or more'
    }

    if (!values.address) {
      errors.address = 'Missing Address'
    }
    if (!values.email) {
      errors.email = 'Missing Email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    } else {
      userEmailList.filter(userName => {
        if (values.email === userName) {
          errors.email = 'already have this email in the database'
        }
      })
    }
    return errors
  },
  form: 'Profile',
})(Profile)


const mapStateToProps = state => {
  const selector = formValueSelector('Profile')
  const firstNameForm = selector(state, 'firstName')
  const lastNameForm = selector(state, 'lastName')
  const emailForm = selector(state, 'email')
  const addressForm = selector(state, 'address')
  const maleGender = selector(state, 'gender')
  const birthDateForm = selector(state, 'birthDate')
  const {
    firstName, lastName, email, address, gender, birthDate, id,
  } = state.newUser
  const { listUsers } = state
  const userEmailList = listUsers.users.map(user => {
    if (user.id === id) {
    } else {
      return user.email
    }
  })
  return {
    initialValues: {
      firstName, lastName, birthDate, email, address, gender,
    },
    firstNameForm,
    lastNameForm,
    birthDateForm,
    emailForm,
    addressForm,
    maleGender,
    userEmailList,
  }
}

export default Profile = connect(
  mapStateToProps,
  { forwardBackProfile },
)(Profile)
