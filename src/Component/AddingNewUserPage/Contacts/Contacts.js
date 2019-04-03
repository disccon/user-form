import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Contacts.scss'
import AddICon from '../../../img/icon/AddICon'
import { Field, formValueSelector, reduxForm } from "redux-form";
import InputMask from 'react-input-mask';

import Select from 'react-select'

const cx = classNames.bind(styles)

const renderFieldInput = ({ label, input, type, meta: { touched, error }, className, span, placeholder,  mask}) => {
  const inputRender = mask ? <InputMask {...input} mask={mask} placeholder={placeholder}/>
    : <input {...input} type={type} className={className} placeholder={placeholder}/>
  return (<label className={cx('profile__label')}>
    <h4>{label}</h4>
    {span && <span>*</span>}
    {inputRender}
    {touched && error && <p>{error}</p>}
  </label>)
}
const options = [
  { value: 'englishUSA', label: 'English, USA' },
  { value: 'englishUK', label: 'English, UK' },
  { value: 'englishUK2', label: 'English, UK 2' },
  { value: 'englishUK3', label: 'English, UK 3' },
  { value: 'englishUK4', label: 'English, UK 4' },
  { value: 'englishUK5', label: 'English, UK 5' },
]
const colourStyles = {
  control: styles => ({
    ...styles,
    width: '300px',
    height: '40px',
    backgroundColor: 'white',
    border: '1px solid #C1CFE0',
    borderRadius: '0px',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    opacity: 0,
  }),
  container: styles => ({
    ...styles,
    color: '#657C9A',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
  }),
  menuList: styles => ({
    ...styles,
    height: '172px',
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
    color: '#000000',
  }),
  placeholder: styles => ({
    ...styles,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
    color: '#657C9A',
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
    color: '#000000',
  }),
};

class Contacts extends Component {
  render() {
    return (
      <Fragment>
        <div className={cx('contacts')}>
          <div className={cx('contacts__sideLeft')}>
            <Field component={renderFieldInput} type="text"
                   label='Company' name="company"/>
            <Field component={renderFieldInput} type="text"
                   label='Github link' name="githubLink"/>
            <Field component={renderFieldInput} type="text"
                   label='Facebook link' name="facebookLink" placeholder='www.facebook.com/hdfk_142_23lelf/'
                   span='*'/>
            <Select
              options={options}
              styles={colourStyles}
              className={cx('contacts__select')}
            />
          </div>
          <div className={cx('contacts__sideRight')}>
            <Field component={renderFieldInput} type="text"
                   label='Fax' name="fax"
                   span='*'/>
            <Field component={renderFieldInput} type="text"
                   label='Phone #1' name="phoneN1"
                   placeholder='+38 (066) 888 88 88' mask='+38 (999) 999 99 99'/>
            <Field component={renderFieldInput} type="text"
                   label='Phone #2' name="phoneN2" mask='+38 (999) 999 99 99'/>
            <button type='button' className={cx('contacts__addPhone')}>
              <AddICon className={cx('contacts__addICon')}/>
              add phone number
            </button>
            <div className={cx('contacts__addPhone')}></div>
            <div className={cx('wrapperButton')}>
              <button className={cx('profile__back')}>Back</button>
              <button className={cx('profile__forward')}>Forward</button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

Contacts.propTypes = {}


Contacts = reduxForm({
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

    //'Sorry, you must be at least 18 years old'
    //'You do not meet the minimum age requirement!' возраст
    //Must be at least
    //'Must be a number'
    //'Invalid phone number, must be 10 digits' «Неверный номер телефона, должен быть 10 цифр»

    return errors;
  },
  form: 'Profile',
})(Contacts)

const mapStateToProps = state => {
  const { company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3, quantityPhone } = state.newUser
  return {
    initialValues: {
      company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3,
    },
    quantityPhone
  }
}

export default connect(
  mapStateToProps,
)(Contacts)