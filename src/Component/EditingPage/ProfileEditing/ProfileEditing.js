import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { reduxForm, Field } from 'redux-form'
import styles from '../../UserFormBox/UserFormBox.scss'
import { profileEditingSave } from '../../../Actions'
import { UserFormBox } from '../../UserFormBox/UserFormBox'
import { renderFieldInputNewUser } from '../../renderFieldForm/renderFieldInputNewUser/renderFieldInputNewUser'
import {
  renderDateTimePickerProfile,
} from '../../renderFieldForm/renderDateTimePickerProfile/renderDateTimePickerProfile'
import { renderFieldRadioProfile } from '../../renderFieldForm/renderFieldRadioProfile/renderFieldRadioProfile'


const cx = classNames.bind(styles)


class ProfileEditing extends Component {
    onSubmit = values => {
      const { profileEditingSave, id } = this.props
      profileEditingSave(values.firstName, values.lastName, values.birthDate, values.email,
        values.address, values.gender, id)
    }

    render() {
      const { handleSubmit } = this.props
      return (
        <UserFormBox handleSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('userFormBox__sideLeft')}>
            <Field
              component={renderFieldInputNewUser}
              type='text'
              span
              label='First name'
              name='firstName'
              idField='fieldFirstName'
              classNameLabel='inputNewUser'
            />
            <Field
              component={renderFieldInputNewUser}
              type='text'
              span
              label='Last name'
              name='lastName'
              idField='fieldLastName'
              classNameLabel='inputNewUser'
            />
            <Field name='birthDate' component={renderDateTimePickerProfile} />
          </div>
          <div className={cx('userFormBox__sideRight')}>
            <Field
              component={renderFieldInputNewUser}
              type='text'
              span
              label='Email'
              name='email'
              idField='fieldEmail'
              classNameLabel='inputNewUser'
            />
            <Field
              component={renderFieldInputNewUser}
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
                component={renderFieldRadioProfile}
                type='radio'
                label='Male'
                name='gender'
                value='male'
                idField='fieldMale'
              />
              <Field
                component={renderFieldRadioProfile}
                type='radio'
                label='Female'
                name='gender'
                value='female'
                idField='fieldFemale'
              />
            </div>
            <div className={cx('userFormBox__wrapperButton')}>
              <button type='submit' className={cx('userFormBox__saveNewListButton')}>
                Save
              </button>
            </div>
          </div>
        </UserFormBox>
      )
    }
}

ProfileEditing.propTypes = {
  id: PropTypes.number.isRequired,
  profileEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


const ProfileEditingForm = reduxForm({
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
      userEmailList.forEach(userName => {
        errors.email = values.email === userName ? 'already have this email in the database' : null
      })
    }
    return errors
  },
  form: 'ProfileEditing',
  enableReinitialize: true,
})(ProfileEditing)


const mapStateToProps = state => {
  const { users } = state.listUsers
  const { pathname } = state.router.location
  const id = Number(pathname.slice(9, pathname.indexOf('/', 9)))
  const user = { ...users[id - 1] }
  const {
    firstName, lastName, birthDate, email, address, gender,
  } = user
  const userEmailFilter = users.filter(user => user.id !== id)
  const userEmailList = userEmailFilter.map(user => user.email)
  return {
    initialValues: {
      firstName, lastName, birthDate, email, address, gender,
    },
    userEmailList,
    id,
  }
}

export default connect(
  mapStateToProps,
  { profileEditingSave },
)(ProfileEditingForm)
