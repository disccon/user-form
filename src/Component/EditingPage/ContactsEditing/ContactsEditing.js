import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  Field, reduxForm, FieldArray,
} from 'redux-form'
import styles from './ContactsEditing.scss'
import { contactsEditingSave } from '../../../Actions'
import renderFieldArrayPhone from './renderFieldArrayPhone/renderFieldArrayPhone'
import { renderFieldSelectContacts } from './renderFieldSelectContacts/renderFieldSelectContacts'
import { renderFieldInputNewUser } from '../renderFieldInputNewUser/renderFieldInputNewUser'


const cx = classNames.bind(styles)

class ContactsEditing extends Component {
  onSubmit = values => {
    const { contactsEditingSave, id } = this.props
    contactsEditingSave(values.company, values.githubLink, values.facebookLink, values.selectLanguage,
      values.fax, values.phoneArray, values.phoneN1, values.phoneN2, values.phoneN3, id)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Fragment>
        <form className={cx('contacts')} onSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('contacts__sideLeft')}>
            <Field
              component={renderFieldInputNewUser}
              type='text'
              label='Company'
              name='company'
              idField='fieldCompany'
              classNameLabel='fieldInputNewUser'
            />
            <Field
              component={renderFieldInputNewUser}
              type='text'
              span
              label='Github link'
              name='githubLink'
              idField='fieldGithubLink'
              classNameLabel='fieldInputNewUser'
            />
            <Field
              component={renderFieldInputNewUser}
              type='text'
              span
              label='Facebook link'
              name='facebookLink'
              placeholder='www.facebook.com/hdfk_142_23lelf/'
              idField='fieldFacebookLink'
              classNameLabel='fieldInputNewUser'
            />
            <Field
              component={renderFieldSelectContacts}
              name='selectLanguage'
              label='Main language'
            />
          </div>
          <div className={cx('contacts__sideRight')}>
            <Field
              component={renderFieldInputNewUser}
              type='text'
              label='Fax'
              name='fax'
              mask='+7 (999) 999-99-99'
              idField='fieldFax'
              classNameLabel='fieldInputNewUser'
            />
            <FieldArray
              component={renderFieldArrayPhone}
              name='phoneArray'
            />
            <div className={cx('contacts__addPhone')} />
            <button type='submit' className={cx('saveNewListButton')}>Save</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

ContactsEditing.propTypes = {
  id: PropTypes.number.isRequired,
  contactsEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const ContactsEditingForm = reduxForm({
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
  form: 'ContactsEditing',
  enableReinitialize: true,
})(ContactsEditing)

const mapStateToProps = state => {
  const { users } = state.listUsers
  const { pathname } = state.router.location
  const id = Number(pathname.slice(9, pathname.indexOf('/', 9)))
  const user = { ...users[id - 1] }
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
  } = user
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
    },
    id,
  }
}

export default connect(
  mapStateToProps,
  { contactsEditingSave },
)(ContactsEditingForm)
