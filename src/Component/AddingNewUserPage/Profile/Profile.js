import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Profile.scss'
import { reduxForm, Field } from 'redux-form';
import { saveBirthDate, saveGenderInput } from "../../../Actions";
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


// firstName, lastName, birthDate, email, address, gender
class Profile extends Component {
  changeBirthDate = value => {
    const { saveBirthDate } = this.props
    saveBirthDate(value)
  }
  changeRadioInput = event => {
    const { saveGenderInput } = this.props
    saveGenderInput(event.target.value)
  }
  render() {
    const { birthDate, gender } = this.props
    return (
      <div className={cx('profile')}>
        <form className={cx('profile__form')}>
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
                          isOpen='false'
                          locale='en'
                          onChange={this.changeBirthDate}
                          value={birthDate}
                // format='y-MM-dd'
                          calendarClassName='profile__react-calendar'/>
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


              {/*<label className="radio">*/}
                {/*<input type="radio" name="gender2"/>*/}
                {/*<div className="radio__text">А я переключаю радиокнопку</div>*/}
              {/*</label>*/}
              {/*<label className="radio">*/}
                {/*<input type="radio" name="gender2"/>*/}
                {/*<div className="radio__text">А я переключаю радиокнопку</div>*/}
              {/*</label>*/}

            </div>
            {/*<div className={cx('wrapperButton')}>*/}
              {/*<button className={cx('profile__back')}>Back</button>*/}
              {/*<button className={cx('profile__forward')}>Forward</button>*/}
            {/*</div>*/}
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

    if (values.firstName) {
      if (values.firstName.length <= 2) {
        errors.firstName = 'Username must be more than 2 letters'
      }
    }
    if (values.lastName) {
      if (values.lastName.length <= 2) {
        errors.lastName = 'Username must be more than 2 letters'
      }
    }
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (values.address) {
      if (values.address.length <= 4) {
        errors.address = 'Username must be more than 4 letters'
      }
    }
    return errors;
  },
  form: 'Profile',
})(Profile)

//const selector = formValueSelector('Account')
//const haspassword = selector(state, 'password')


const mapStateToProps = state => {
  const { firstName, lastName, email, address, gender, birthDate, } = state.initialState.newUser
  return {
    initialValues: {
      firstName, lastName, email, address,
    },
    birthDate,
    gender,
  }
}

export default Profile = connect(
  mapStateToProps,
  { saveBirthDate, saveGenderInput }
)(Profile)



