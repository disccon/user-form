import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { formValueSelector } from 'redux-form'
import ProfileForm from '../../../components/UserFormBox/ProfileForm/ProfileForm'
import '../../../components/UserFormBox/UserFormBox.scss'
import { saveNewUserData } from '../../../actions/actionNewUser'
import { asyncValidateCreateProfile } from '../../../components/UserFormBox/validateForm/asyncValidateCreateProfile'

class CreateUserProfile extends Component {
  onSubmit = values => {
    const { saveNewUserData, push } = this.props
    saveNewUserData({
      ...values,
      profileFilled: true,
    })
    push('/contacts')
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
    const wrapperButton = (
      <Fragment>
        <button type='button' onClick={this.backProfile} className='userFormBox__back'>
          Back
        </button>
        <button type='submit' className='userFormBox__forward'>
          Forward
        </button>
      </Fragment>
    )
    return (
      <ProfileForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['firstName', 'lastName', 'birthDate', 'email', 'address', 'gender'])}
        asyncValidate={asyncValidateCreateProfile}
      />
    )
  }
}

CreateUserProfile.propTypes = {
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
  push: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const selector = formValueSelector('ProfileForm')
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
    firstName,
    lastName,
    birthDate,
    email,
    address,
    gender,

    firstNameForm,
    lastNameForm,
    emailForm,
    birthDateForm,
    addressForm,
    genderForm,
  }
}

export default connect(
  mapStateToProps,
  { push, saveNewUserData },
)(CreateUserProfile)
