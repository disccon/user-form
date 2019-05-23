import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import {
  Field, formValueSelector, reduxForm, FieldArray,
} from 'redux-form'
import styles from '../../../components/userFormBox/UserFormBox.scss'
import { saveNewUserData } from '../../../actions/actionNewUser'
import FieldSelectContacts from '../../../components/fieldForm/fieldSelectContacts/FieldSelectContacts'
import FieldInputNewUser from '../../../components/fieldForm/fieldInputNewUser/FieldInputNewUser'
import UserFormBox from '../../../components/userFormBox/UserFormBox'
import FieldArrayPhone from '../../../components/fieldForm/fieldArrayPhone/FieldArrayPhone'

const cx = classNames.bind(styles)

class Contacts extends Component {
  backContacts = () => {
    const {
      saveNewUserData, companyForm, githubLinkForm, facebookLinkForm, selectLanguageForm, faxForm, phoneArrayForm, push,
    } = this.props
    push('/profile')
    saveNewUserData({
      company: companyForm,
      githubLink: githubLinkForm,
      facebookLink: facebookLinkForm,
      selectLanguage: selectLanguageForm,
      fax: faxForm,
      phoneArray: phoneArrayForm,
    })
  }

  onSubmit = values => {
    const { saveNewUserData, push } = this.props
    push('/capabilities')
    saveNewUserData({
      company: values.company,
      githubLink: values.githubLink,
      facebookLink: values.facebookLink,
      selectLanguage: values.selectLanguage,
      fax: values.fax,
      phoneArray: values.phoneArray,
      contactsFilled: true,
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
            label='Company'
            name='company'
            idField='fieldCompany'
            classNameLabel='inputNewUser'
          />
          <Field
            component={FieldInputNewUser}
            type='text'
            span
            label='Github link'
            name='githubLink'
            idField='fieldGithubLink'
            classNameLabel='inputNewUser'
          />
          <Field
            component={FieldInputNewUser}
            type='text'
            span
            label='Facebook link'
            name='facebookLink'
            placeholder='www.facebook.com/hdfk_142_23lelf/'
            idField='fieldFacebookLink'
            classNameLabel='inputNewUser'
          />
          <Field
            component={FieldSelectContacts}
            name='selectLanguage'
            label='Main language'
          />
        </div>
        <div className={cx('userFormBox__sideRight')}>
          <Field
            component={FieldInputNewUser}
            type='text'
            label='Fax'
            name='fax'
            mask='+7 (999) 999-99-99'
            idField='fieldFax'
            classNameLabel='inputNewUser'
          />
          <FieldArray
            component={FieldArrayPhone}
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
  saveNewUserData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
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
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
  } = state.newUser
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
    },
    companyForm,
    githubLinkForm,
    facebookLinkForm,
    selectLanguageForm,
    phoneArray,
    faxForm,
    phoneArrayForm,
  }
}

export default connect(
  mapStateToProps,
  { saveNewUserData, push },
)(ContactsForm)
