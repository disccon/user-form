import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import styles from '../../../components/UserFormBox/UserFormBox.scss'
import {
  saveNewUserData,
} from '../../../actions/actionNewUser'
import FieldRadioProfile from '../../../components/fieldForm/FieldRadioProfile/FieldRadioProfile'
import DateTimePickerProfile
  from '../../../components/fieldForm/DateTimePickerProfile/DateTimePickerProfile'
import FieldInputNewUser from '../../../components/fieldForm/FieldInputNewUser/FieldInputNewUser'
import UserFormBox from '../../../components/UserFormBox/UserFormBox'
import db from '../../../db'

const cx = classNames.bind(styles)

class Profile extends Component {
    onSubmit = values => {
      const { saveNewUserData, push } = this.props
      push('/contacts')
      saveNewUserData({
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        email: values.email,
        address: values.address,
        gender: values.gender,
        profileFilled: true,
      })
    }

    backProfile = () => {
      const {
        saveNewUserData, firstNameForm, lastNameForm, birthDateForm, emailForm, addressForm, genderForm, push,
      } = this.props
      push('/')
      saveNewUserData({
        firstName: firstNameForm,
        lastName: lastNameForm,
        birthDate: birthDateForm,
        email: emailForm,
        address: addressForm,
        gender: genderForm,
      })
    }

    render() {
      const { handleSubmit } = this.props
      return (
        <UserFormBox handleSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('userFormBox__sideLeft')}>
            <Field
              component={FieldInputNewUser}
              type='text'
              span
              label='First name'
              name='firstName'
              idField='fieldFirstName'
              classNameLabel='inputNewUser'
            />
            <Field
              component={FieldInputNewUser}
              type='text'
              span
              label='Last name'
              name='lastName'
              idField='fieldLastName'
              classNameLabel='inputNewUser'
            />
            <Field name='birthDate' component={DateTimePickerProfile} />
          </div>
          <div className={cx('userFormBox__sideRight')}>
            <Field
              component={FieldInputNewUser}
              type='text'
              span
              label='Email'
              name='email'
              idField='fieldEmail'
              classNameLabel='inputNewUser'
            />
            <Field
              component={FieldInputNewUser}
              type='text'
              span
              label='Address'
              name='address'
              idField='fieldAddress'
              classNameLabel='inputNewUser'
            />
            <h5>Gender</h5>
            <div className={cx('userFormBox__wrapperGender')}>
              <Field
                component={FieldRadioProfile}
                type='radio'
                label='Male'
                name='gender'
                value='male'
                idField='fieldMale'
              />
              <Field
                component={FieldRadioProfile}
                type='radio'
                label='Female'
                name='gender'
                value='female'
                idField='fieldFemale'
              />
            </div>
            <div className={cx('userFormBox__wrapperButton')}>
              <button type='button' onClick={this.backProfile} className={cx('userFormBox__back')}>
                Back
              </button>
              <button type='submit' className={cx('userFormBox__forward')}>Forward</button>
            </div>
          </div>
        </UserFormBox>
      )
    }
}

Profile.propTypes = {
  firstNameForm: PropTypes.string,
  lastNameForm: PropTypes.string,
  birthDateForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  emailForm: PropTypes.string,
  addressForm: PropTypes.string,
  genderForm: PropTypes.string,
  saveNewUserData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const ProfileForm = reduxForm({
  asyncValidate: values => db.usersDB.toArray(usersDB => {
    const userEmailList = usersDB.map(user => user.email)
    let errorEmail
    userEmailList.find(userEmail => (
      errorEmail = values.email === userEmail ? 'already have this email in the database' : null))
    if (errorEmail) {
      return Promise.reject({
        email: errorEmail,
      })
    }
  }),
  validate: values => {
    const errors = {}
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
    }
    return errors
  },
  form: 'Profile',
  enableReinitialize: true,
})(Profile)

const mapStateToProps = state => {
  const selector = formValueSelector('Profile')
  const firstNameForm = selector(state, 'firstName')
  const lastNameForm = selector(state, 'lastName')
  const emailForm = selector(state, 'email')
  const addressForm = selector(state, 'address')
  const genderForm = selector(state, 'gender')
  const birthDateForm = selector(state, 'birthDate')
  const {
    firstName, lastName, email, address, gender, birthDate,
  } = state.newUser
  return {
    initialValues: {
      firstName, lastName, birthDate, email, address, gender,
    },
    firstNameForm,
    lastNameForm,
    birthDateForm,
    emailForm,
    addressForm,
    genderForm,
  }
}

export default connect(
  mapStateToProps,
  { saveNewUserData, push },
)(ProfileForm)
