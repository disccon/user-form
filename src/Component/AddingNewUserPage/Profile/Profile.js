import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Profile.scss'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { saveBirthDate, saveGenderInput, forwardBackProfile } from '../../../Actions'
import DatePicker from 'react-date-picker';
// import DatePicker from 'react-date-picker/dist/entry.nostyle'
import { ReactComponent as CalendarIcon } from '../../../img/icon/calendar.svg'


const cx = classNames.bind(styles)

const renderFieldInput = ({ label, input, type, meta: { touched, error }, className }) => (
  <label className={cx('profile__label')}>
    <h4>{label}</h4>
    <span>*</span>
    <input {...input} type={type} className={className}/>
    {touched && error && <p>{error}</p>}
  </label>
)


class Profile extends Component {
  state = {
    ageError: false,
  }
  changeBirthDate = value => {
    const { saveBirthDate } = this.props
    saveBirthDate(value)
  }
  changeRadioInput = event => {
    const { saveGenderInput } = this.props
    saveGenderInput(event.target.value)
  }
  onSubmit = values => {
    const { birthDate } = this.props
    if(birthDate !== null){
      let age = new Date().getFullYear() - birthDate.getFullYear()
       if(age < 18){
         this.setState({
          ageError: 'Sorry, you must be at least 18 years old'
        })
      } else {
         this.setState({
           ageError: false
         })
         const { forwardBackProfile } = this.props;
         forwardBackProfile('forward', values.firstName, values.lastName, values.email, values.address)
       }
    } else {
      this.setState({
        ageError: 'Missing Birth Date'
      })
    }
  }
  backProfile = () => {

    const { firstNameForm, lastNameForm, emailForm, addressForm, forwardBackProfile } = this.props;
    forwardBackProfile('back', firstNameForm, lastNameForm, emailForm, addressForm)
  }
  render() {
    const { birthDate, gender, handleSubmit } = this.props
    const { ageError } = this.state
    return (
      <div className={cx('profile')}>
        <form className={cx('profile__form')} onSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('profile__sideLeft')}>
            <Field component={renderFieldInput} type="text"
                   label='First name' name="firstName"/>
            <Field component={renderFieldInput} type="text"
                   label='Last name' name="lastName"/>
            <div className={cx('profile__birthDate')}>
              <h4>Birth date</h4>
              <span className={cx('profile__birthDateSpan')}>*</span>
              <DatePicker clearIcon='' calendarIcon={<CalendarIcon/>}
                          className={cx('profile__datePicker')}
                          name='birthDate'
                          isOpen={true}
                          locale='en'
                          onChange={this.changeBirthDate}
                          value={birthDate}
                          calendarClassName='profile__react-calendar'/>
              {ageError && <p className={cx('birthDate__error')}>{ageError}</p>}
            </div>
          </div>
          <div className={cx('profile__sideRight')}>
            <Field component={renderFieldInput} type="text"
                   label='Email' name="email"/>
            <Field component={renderFieldInput} type="text"
                   label='Address' name="address"/>
            <h5>Gender</h5>
            <div className={cx('wrapperGender')}>
              <label>
                <input type="radio" name="gender" value='Male'
                       checked={gender === 'Male'}
                       onChange={this.changeRadioInput}
                />
                <span>Male</span>
              </label>
              <label>
              <input type="radio" name="gender" value='Female'
                     checked={gender === 'Female'}
                     onChange={this.changeRadioInput}
              />
                <span>Female</span>
              </label>
            </div>
            <div className={cx('wrapperButton')}>
              <button type='button' onClick={this.backProfile} className={cx('profile__back')}>Back</button>
              <button type='submit' className={cx('profile__forward')}>Forward</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Profile.propTypes = {}


Profile = reduxForm({
  validate: values => {
    const errors = {};

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
    return errors;
  },
  form: 'Profile',
})(Profile)


const mapStateToProps = state => {
  const selector = formValueSelector('Profile')
  const firstNameForm = selector(state, 'firstName')
  const lastNameForm = selector(state, 'lastName')
  const emailForm = selector(state, 'email')
  const addressForm = selector(state, 'address')
  const { firstName, lastName, email, address, gender, birthDate, } = state.newUser
  return {
    initialValues: {
      firstName, lastName, email, address,
    },
    birthDate, gender, firstNameForm, lastNameForm, emailForm, addressForm,
  }
}

export default Profile = connect(
  mapStateToProps,
  { saveBirthDate, saveGenderInput, forwardBackProfile  }
)(Profile)



