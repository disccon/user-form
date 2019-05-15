import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  Field, formValueSelector, reduxForm, FieldArray,
} from 'redux-form'
import styles from '../../UserFormBox/UserFormBox.scss'
import { forwardBackContacts, deleteAddFieldPhone } from '../../../Actions'

import { renderFieldSelectContacts } from '../../renderFieldForm/renderFieldSelectContacts/renderFieldSelectContacts'
import { renderFieldInputNewUser } from '../../renderFieldForm/renderFieldInputNewUser/renderFieldInputNewUser'
import { UserFormBox } from '../../UserFormBox/UserFormBox'
import { renderFieldArrayPhone } from "../../renderFieldForm/renderFieldArrayPhone/renderFieldArrayPhone";

const cx = classNames.bind(styles)

class Contacts extends Component {
  backContacts = () => {
    const {
      companyForm, githubLinkForm, facebookLinkForm, selectLanguageForm, faxForm, phoneArrayForm, phoneN1Form,
      phoneN2Form, phoneN3Form, forwardBackContacts,
    } = this.props
    forwardBackContacts('back', companyForm, githubLinkForm, facebookLinkForm, selectLanguageForm, faxForm,
      phoneArrayForm, phoneN1Form, phoneN2Form, phoneN3Form)
  }

  onSubmit = values => {
    const { forwardBackContacts } = this.props
    forwardBackContacts('forward', values.company, values.githubLink, values.facebookLink, values.selectLanguage,
      values.fax, values.phoneArray, values.phoneN1, values.phoneN2, values.phoneN3)
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
    const { handleSubmit, deleteAddFieldPhone } = this.props
    return (
      <UserFormBox handleSubmit={handleSubmit(this.onSubmit)}>
        <div className={cx('userFormBox__sideLeft')}>
          <Field
            component={renderFieldInputNewUser}
            type='text'
            label='Company'
            name='company'
            idField='fieldCompany'
            classNameLabel='inputNewUser'
          />
          <Field
            component={renderFieldInputNewUser}
            type='text'
            span
            label='Github link'
            name='githubLink'
            idField='fieldGithubLink'
            classNameLabel='inputNewUser'
          />
          <Field
            component={renderFieldInputNewUser}
            type='text'
            span
            label='Facebook link'
            name='facebookLink'
            placeholder='www.facebook.com/hdfk_142_23lelf/'
            idField='fieldFacebookLink'
            classNameLabel='inputNewUser'
          />
          <Field
            component={renderFieldSelectContacts}
            name='selectLanguage'
            label='Main language'
          />
        </div>
        <div className={cx('userFormBox__sideRight')}>
          <Field
            component={renderFieldInputNewUser}
            type='text'
            label='Fax'
            name='fax'
            mask='+7 (999) 999-99-99'
            idField='fieldFax'
            classNameLabel='inputNewUser'
          />
          <FieldArray
            component={renderFieldArrayPhone}
            name='phoneArray'
          />
          <div className={cx('userFormBox__addPhone')} />
          <div className={cx('userFormBox__wrapperButton')}>
            <button type='button' onClick={this.backContacts} className={cx('userFormBox__back')}>Back</button>
            <button type='submit' className={cx('userFormBox__forward')}>Forward</button>
          </div>
        </div>
      </UserFormBox>
    )
  }
}

Contacts.propTypes = {
  companyForm: PropTypes.string,
  githubLinkForm: PropTypes.string,
  facebookLinkForm: PropTypes.string,
  selectLanguageForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  faxForm: PropTypes.string,
  phoneArrayForm: PropTypes.array,
  phoneN1Form: PropTypes.string,
  phoneN2Form: PropTypes.string,
  phoneN3Form: PropTypes.string,
  forwardBackContacts: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const ContactsForm = reduxForm({
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
  const phoneArrayForm = selector(state, 'phoneArray')
  const phoneN1Form = selector(state, 'phoneN1')
  const phoneN2Form = selector(state, 'phoneN2')
  const phoneN3Form = selector(state, 'phoneN3')
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
  } = state.newUser
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
    },
    companyForm,
    githubLinkForm,
    facebookLinkForm,
    selectLanguageForm,
    faxForm,
    phoneArrayForm,
    phoneN1Form,
    phoneN2Form,
    phoneN3Form,
  }
}

export default connect(
  mapStateToProps,
  { forwardBackContacts, deleteAddFieldPhone },
)(ContactsForm)
