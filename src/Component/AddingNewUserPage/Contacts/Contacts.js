import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import styles from './Contacts.scss'
import { forwardBackContacts, deleteAddFieldPhone } from '../../../Actions'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { renderFieldPhoneContacts } from './renderFieldPhoneContacts'
import { renderFieldInputContacts } from './renderFieldInputContacts'
import { renderFieldSelectContacts } from './renderFieldSelectContacts'

const cx = classNames.bind(styles)


class Contacts extends Component {
  backContacts = () => {
    const {
      companyForm, githubLinkForm, facebookLinkForm, selectLanguageForm, faxForm, phoneN1Form, phoneN2Form, phoneN3Form,
      forwardBackContacts,
    } = this.props
    forwardBackContacts('back', companyForm, githubLinkForm, facebookLinkForm, selectLanguageForm, faxForm, phoneN1Form,
      phoneN2Form, phoneN3Form)
  }

  onSubmit = values => {
    const { forwardBackContacts } = this.props
    forwardBackContacts('forward', values.company, values.githubLink, values.facebookLink, values.selectLanguage, values.fax,
      values.phoneN1, values.phoneN2, values.phoneN3)
  }

  deleteFieldPhone = () => {
    const { deleteAddFieldPhone } = this.props
    deleteAddFieldPhone('delete')
  }

  addFieldPhone = () => {
    const { deleteAddFieldPhone } = this.props
    deleteAddFieldPhone('add')
  }

  render() {
    const { quantityPhoneField, handleSubmit } = this.props
    const phoneFieldN1 = quantityPhoneField >= 2
      ? (
        <Field
          component={renderFieldPhoneContacts}
          type='text'
          placeholder='+7 (066) 888-88-88'
          label='Phone #1'
          name='phoneN1'
          span
          deleteFieldPhone={this.deleteFieldPhone}
          idField='filedPhoneN1'
        />
      )
      : (
        <Field
          component={renderFieldPhoneContacts}
          type='text'
          placeholder='+7 (066) 888-88-88'
          label='Phone #1'
          name='phoneN1'
          deleteFieldPhone={this.deleteFieldPhone}
          idField='filedPhoneN1'
        />
      )
    const phoneFieldN2 = quantityPhoneField >= 2
      ? (
        <Field
          component={renderFieldPhoneContacts}
          type='text'
          label='Phone #2'
          name='phoneN2'
          span
          deleteFieldPhone={this.deleteFieldPhone}
          idField='filedPhoneN2'
        />
      )
      : null
    const phoneFieldN3 = quantityPhoneField === 3
      ? (
        <Field
          component={renderFieldPhoneContacts}
          type='text'
          label='Phone #3'
          name='phoneN3'
          span
          deleteFieldPhone={this.deleteFieldPhone}
          idField='filedPhoneN3'
        />
      )
      : null
    const addPhoneField = quantityPhoneField < 3
      ? (
        <button type='button' className={cx('contacts__addPhoneField')} onClick={this.addFieldPhone}>
          <AddIcon className={cx('contacts__addIcon')} />
          <span>add phone number</span>
        </button>
      ) : null
    return (
      <Fragment>
        <form className={cx('contacts')} onSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('contacts__sideLeft')}>
            <Field
              component={renderFieldInputContacts}
              type='text'
              label='Company'
              name='company'
              idField='fieldCompany'
            />
            <Field
              component={renderFieldInputContacts}
              type='text'
              label='Github link'
              name='githubLink'
              idField='fieldGithubLink'
            />
            <Field
              component={renderFieldInputContacts}
              type='text'
              label='Facebook link'
              name='facebookLink'
              placeholder='www.facebook.com/hdfk_142_23lelf/'
              span='*'
              idField='fieldFacebookLink'
            />
            <Field component={renderFieldSelectContacts} name='selectLanguage' label='Main language' idField='fieldSelectLanguage' />
          </div>
          <div className={cx('contacts__sideRight')}>
            <Field
              component={renderFieldInputContacts}
              type='text'
              label='Fax'
              name='fax'
              mask='+7 (999) 999-99-99'
              span='*'
              idField='fieldFax'
            />
            {phoneFieldN1}
            {phoneFieldN2}
            {phoneFieldN3}
            {addPhoneField}
            <div className={cx('contacts__addPhone')} />
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

Contacts.propTypes = {
  quantityPhoneField: PropTypes.number,
  companyForm: PropTypes.string,
  githubLinkForm: PropTypes.string,
  facebookLinkForm: PropTypes.string,
  selectLanguageForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  faxForm: PropTypes.string,
  phoneN1Form: PropTypes.string,
  phoneN2Form: PropTypes.string,
  phoneN3Form: PropTypes.string,
  forwardBackContacts: PropTypes.func.isRequired,
  deleteAddFieldPhone: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


Contacts = reduxForm({
  validate: values => {
    const errors = {}

    if (!values.selectLanguage) {
      errors.selectLanguage = 'Missing Main language'
    }

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
    } else {
      errors.fax = values.fax.charAt(17) >= 0 ? null : 'Must be 10 digits'
    }

    if (!values.phoneN1) {
      errors.phoneN1 = 'Missing Phone Number'
    } else {
      errors.phoneN1 = values.phoneN1.charAt(17) >= 0 ? null : 'Must be 10 digits'
    }

    if (!values.phoneN2) {
      errors.phoneN2 = 'Missing Phone Number'
    } else {
      errors.phoneN2 = values.phoneN2.charAt(17) >= 0 ? null : 'Must be 10 digits'
    }
    if (!values.phoneN3) {
      errors.phoneN3 = 'Missing Phone Number'
    } else {
      errors.phoneN3 = values.phoneN3.charAt(17) >= 0 ? null : 'Must be 10 digits'
    }

    return errors
  },
  form: 'Contacts',
  enableReinitialize: true,
})(Contacts)

const mapStateToProps = state => {
  const selector = formValueSelector('Contacts')
  const companyForm = selector(state, 'company')
  const githubLinkForm = selector(state, 'githubLink')
  const facebookLinkForm = selector(state, 'facebookLink')
  const selectLanguageForm = selector(state, 'selectLanguage')
  const faxForm = selector(state, 'fax')
  const phoneN1Form = selector(state, 'phoneN1')
  const phoneN2Form = selector(state, 'phoneN2')
  const phoneN3Form = selector(state, 'phoneN3')
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneN1, phoneN2, phoneN3, quantityPhoneField,
  } = state.newUser
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneN1, phoneN2, phoneN3,
    },
    quantityPhoneField,
    companyForm,
    githubLinkForm,
    facebookLinkForm,
    selectLanguageForm,
    faxForm,
    phoneN1Form,
    phoneN2Form,
    phoneN3Form,
  }
}

export default connect(
  mapStateToProps,
  { forwardBackContacts, deleteAddFieldPhone },
)(Contacts)
