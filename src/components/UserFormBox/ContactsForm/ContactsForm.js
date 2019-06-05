import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field, FieldArray, reduxForm } from 'redux-form'
import styles from '../UserFormBox.scss'
import FieldSelectContacts from '../../fieldForm/FieldSelectContacts/FieldSelectContacts'
import FieldInputNewUser from '../../fieldForm/FieldInputNewUser/FieldInputNewUser'
import UserFormBox from '../UserFormBox'
import FieldArrayPhone from '../../fieldForm/FieldArrayPhone/FieldArrayPhone'
import { validateContacts } from '../validateForm/validateContacts'

const cx = classNames.bind(styles)
const Contacts = ({ handleSubmit, onSubmit, wrapperButton }) => (
  <UserFormBox handleSubmit={handleSubmit(onSubmit)}>
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
        {wrapperButton}
      </div>
    </div>
  </UserFormBox>
)

Contacts.propTypes = {
  wrapperButton: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const ContactsForm = reduxForm({
  validate: validateContacts,
  form: 'ContactsForm',
  enableReinitialize: true,
  touchOnBlur: false,
})(Contacts)

export default ContactsForm
