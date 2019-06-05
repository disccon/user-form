import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import styles from '../UserFormBox.scss'
import FieldRadioProfile from '../../fieldForm/FieldRadioProfile/FieldRadioProfile'
import DateTimePickerProfile
  from '../../fieldForm/DateTimePickerProfile/DateTimePickerProfile'
import FieldInputNewUser from '../../fieldForm/FieldInputNewUser/FieldInputNewUser'
import UserFormBox from '../UserFormBox'
import { validateProfile } from '../validateForm/validateProfile'

const cx = classNames.bind(styles)

const Profile = ({ handleSubmit, onSubmit, wrapperButton }) => (
  <UserFormBox handleSubmit={handleSubmit(onSubmit)}>
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
        {wrapperButton}
      </div>
    </div>
  </UserFormBox>
)

Profile.propTypes = {
  wrapperButton: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const ProfileForm = reduxForm({
  validate: validateProfile,
  asyncValidate: (values, dispatch, props) => props.asyncValidateProfile(values, props.id),
  form: 'ProfileForm',
  enableReinitialize: true,
  touchOnBlur: false,
})(Profile)

export default ProfileForm
