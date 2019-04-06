import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Contacts.scss'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import InputMask from 'react-input-mask';

import Select from 'react-select'
import { forwardBackContacts, deleteAddFieldPhone, saveSelectLanguage } from '../../../Actions'

const cx = classNames.bind(styles)

const renderFieldInput = ({ label, input, type, meta: { touched, error }, className, span, placeholder, mask }) => {
  const inputRender = mask ? <InputMask {...input} mask={mask} placeholder={placeholder}/>
    : <input {...input} type={type} className={className} placeholder={placeholder}/>
  return (<label className={cx('contacts__label')}>
    <h4>{label}</h4>
    {span && <span>*</span>}
    {inputRender}
    {touched && error && <p>{error}</p>}
  </label>)
}

const renderFieldPhone = ({ label, input, type, meta: { touched, error }, span, placeholder, deleteFieldPhone }) => {
  return (<div className={cx('contacts__labelPhone')}>
    {span && <span onClick={deleteFieldPhone}></span>}
    <label>
      <h4>{label}</h4>
      <InputMask {...input} type={type} mask='+7 (999) 999-99-99' placeholder={placeholder}/>
      {touched && error && <p>{error}</p>}
    </label>
  </div>)
}

const options = [
  { value: 'en', label: 'English, EN' },
  { value: 'fr', label: 'French, FR' },
  { value: 'es', label: 'Spanish, ES' },
  { value: 'ar', label: 'Arabic, AR' },
  { value: 'cmn', label: 'Mandarin, CMN' },
  { value: 'ru', label: 'Russian, RU' },
  { value: 'pt', label: 'Portuguese, PT' },
  { value: 'de', label: 'German, DE' },
  { value: 'ja', label: 'Japanese, JA' },
  { value: 'hi', label: 'Hindi, HI' },
  { value: 'ms', label: 'Malay, MS' },
  { value: 'fa', label: 'Persian, FA' },
  { value: 'sw', label: 'Swahili, SW' },
  { value: 'ta', label: 'Tamil, TA' },
  { value: 'it', label: 'Italian, IT' },
  { value: 'nl', label: 'Dutch, NL' },
  { value: 'bn', label: 'Bengali, BN' },
  { value: 'tr', label: 'Turkish, TR' },
  { value: 'vi', label: 'Vietnamese, VI' },
  { value: 'pl', label: 'Polish, PL' },
  { value: 'jv', label: 'Javanese, JV' },
  { value: 'pa', label: 'Punjabi, PA' },
  { value: 'th', label: 'Thai, TH' },
  { value: 'ko', label: 'Korean, KO' },
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
  menu: styles => ({
    ...styles,
    borderRadius: '0px',
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
  singleValue: styles => ({
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
  state = {
    languageError: false,
  }

  componentDidUpdate() {
    const { selectLanguage } = this.props
    if (this.state.languageError !== false && selectLanguage !== null) {
      this.setState({
        languageError: false
      })
    }
  }

  backContacts = () => {
    const { companyForm, githubLinkForm, facebookLinkForm, faxForm, phoneN1Form, phoneN2Form, phoneN3Form, forwardBackContacts } = this.props;
    forwardBackContacts('back', companyForm, githubLinkForm, facebookLinkForm, faxForm, phoneN1Form, phoneN2Form, phoneN3Form,)
  }
  onSubmit = values => {
    const { forwardBackContacts, selectLanguage } = this.props;
    if (!selectLanguage) {
      this.setState({
        languageError: 'Missing Main language'
      })
    } else {
      forwardBackContacts('forward', values.company, values.githubLink, values.facebookLink, values.fax, values.phoneN1, values.phoneN2, values.phoneN3)
    }
  }
  deleteFieldPhone = () => {
    const { deleteAddFieldPhone } = this.props
    deleteAddFieldPhone('delete')
  }
  addFieldPhone = () => {
    const { deleteAddFieldPhone } = this.props
    deleteAddFieldPhone('add')
  }
  saveSelectLanguage = selectLanguage => {
    const { saveSelectLanguage } = this.props
    saveSelectLanguage(selectLanguage)
  }
  onBlurLanguage = () => {
    const { selectLanguage } = this.props
    if (!selectLanguage) {
      this.setState({
        languageError: 'Missing Main language'
      })
    }
  }

  render() {
    const { languageError } = this.state
    const { quantityPhoneField, selectLanguage, handleSubmit } = this.props
    const phoneFieldN1 = quantityPhoneField >= 2 ?
      <Field component={renderFieldPhone} type="text" placeholder='+7 (066) 888-88-88'
             label='Phone #1' name="phoneN1" span={true} deleteFieldPhone={this.deleteFieldPhone}/> :
      <Field component={renderFieldPhone} type="text" placeholder='+7 (066) 888-88-88'
             label='Phone #1' name="phoneN1" deleteFieldPhone={this.deleteFieldPhone}/>
    const phoneFieldN2 = quantityPhoneField >= 2 ?
      <Field component={renderFieldPhone} type="text"
             label='Phone #2' name="phoneN2" span={true} deleteFieldPhone={this.deleteFieldPhone}/>
      : null
    const phoneFieldN3 = quantityPhoneField === 3 ?
      <Field component={renderFieldPhone} type="text"
             label='Phone #3' name="phoneN3" span={true} deleteFieldPhone={this.deleteFieldPhone}/>
      : null
    const addPhoneField = quantityPhoneField < 3 ?
      <button type='button' className={cx('contacts__addPhoneField')} onClick={this.addFieldPhone}>
        <AddIcon className={cx('contacts__addIcon')}/>
        <span>add phone number</span>
      </button> : null
    return (
      <Fragment>
        <form className={cx('contacts')} onSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('contacts__sideLeft')}>
            <Field component={renderFieldInput} type="text"
                   label='Company' name="company"/>
            <Field component={renderFieldInput} type="text"
                   label='Github link' name="githubLink"/>
            <Field component={renderFieldInput} type="text"
                   label='Facebook link' name="facebookLink" placeholder='www.facebook.com/hdfk_142_23lelf/'
                   span='*'/>
            <label className={cx('contacts__mainLanguage')}>
              <h4>Main language</h4>
              <Select
                onBlur={this.onBlurLanguage}
                value={selectLanguage}
                options={options}
                styles={colourStyles}
                onChange={this.saveSelectLanguage}
              />
              {languageError && <p className={cx('mainLanguage__error')}>{languageError}</p>}
            </label>
          </div>
          <div className={cx('contacts__sideRight')}>
            <Field component={renderFieldInput} type="text"
                   label='Fax' name="fax" mask='+7 (999) 999-99-99'
                   span='*'/>
            {phoneFieldN1}
            {phoneFieldN2}
            {phoneFieldN3}
            {addPhoneField}
            <div className={cx('contacts__addPhone')}></div>
            <div className={cx('wrapperButton')}>
              <button type='button' onClick={this.backContacts} className={cx('contacts__back')}>Back</button>
              <button type='submit' className={cx('contacts__forward')}>Forward</button>
            </div>
          </div>
        </form>
      </Fragment>
    )
  }
}

Contacts.propTypes = {}


Contacts = reduxForm({
  validate: values => {
    const errors = {};

    if (!values.company) {
      errors.company = 'Missing Company'
    } else if (values.company.length <= 2) {
      errors.company = 'Must be 3 characters or more'
    }

    if (!values.githubLink) {
      errors.githubLink = 'Missing Github Link'
    } else if (values.githubLink.length <= 5) {
      errors.githubLink = 'Must be 4 characters or more'
    }

    if (!values.facebookLink) {
      errors.facebookLink = 'Missing Facebook Link'
    } else if (values.facebookLink.length <= 5) {
      errors.facebookLink = 'Must be 4 characters or more'
    }

    if (!values.fax) {
      errors.fax = 'Missing Facebook Fax'
    } else if (values.fax.charAt(17) >= 0) {
    } else {
      errors.fax = 'Must be 10 digits'
    }

    if (!values.phoneN1) {
      errors.phoneN1 = 'Missing Phone Number'
    } else if (values.phoneN1.charAt(17) >= 0) {
    } else {
      errors.phoneN1 = 'Must be 10 digits'
    }
    if (!values.phoneN2) {
      errors.phoneN2 = 'Missing Phone Number'
    } else if (values.phoneN2.charAt(17) >= 0) {
    } else {
      errors.phoneN2 = 'Must be 10 digits'
    }
    if (!values.phoneN3) {
      errors.phoneN3 = 'Missing Phone Number'
    } else if (values.phoneN3.charAt(17) >= 0) {
    } else {
      errors.phoneN3 = 'Must be 10 digits'
    }

    return errors;
  },
  form: 'Contacts',
})(Contacts)

const mapStateToProps = state => {
  const selector = formValueSelector('Contacts')
  const companyForm = selector(state, 'company')
  const githubLinkForm = selector(state, 'githubLinkForm')
  const facebookLinkForm = selector(state, 'facebookLink')
  const faxForm = selector(state, 'fax')
  const phoneN1Form = selector(state, 'phoneN1')
  const phoneN2Form = selector(state, 'phoneN2')
  const phoneN3Form = selector(state, 'phoneN3')
  const { company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3, quantityPhoneField, selectLanguage } = state.newUser
  return {
    initialValues: {
      company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3,
    },
    quantityPhoneField,
    companyForm,
    githubLinkForm,
    facebookLinkForm,
    faxForm,
    phoneN1Form,
    phoneN2Form,
    phoneN3Form,
    selectLanguage
  }
}

export default connect(
  mapStateToProps,
  { forwardBackContacts, deleteAddFieldPhone, saveSelectLanguage }
)(Contacts)