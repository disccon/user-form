import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  Field, reduxForm, FieldArray, formValueSelector,
} from 'redux-form'
import styles from '../../userFormBox/UserFormBox.scss'
import { contactsEditingSave, userEditState, deleteFieldPhoneEditing } from '../../../actions'
import { UserFormBox } from '../../userFormBox/UserFormBox'
import { FieldInputNewUser } from '../../fieldForm/fieldInputNewUser/FieldInputNewUser'
import { FieldSelectContacts } from '../../fieldForm/fieldSelectContacts/FieldSelectContacts'
import { FieldArrayPhone } from '../../fieldForm/fieldArrayPhone/FieldArrayPhone'
import { userGetIndexDB } from '../../../helpers/userGetIndexDB'

const cx = classNames.bind(styles)

class ContactsEditing extends Component {
  componentDidMount() {
    const { userEditState, id } = this.props
    userGetIndexDB(userEditState, id)
  }

  onSubmit = values => {
    const { contactsEditingSave, id } = this.props
    contactsEditingSave(values.company, values.githubLink, values.facebookLink, values.selectLanguage,
      values.fax, values.phoneArray, values.phoneN1, values.phoneN2, values.phoneN3, id)
  }

  deleteFieldPhone = () => {
    const {
      deleteFieldPhoneEditing, phoneN1Form, phoneN2Form, phoneN3Form,
    } = this.props
    deleteFieldPhoneEditing('delete', phoneN1Form, phoneN2Form, phoneN3Form)
  }

  addFieldPhone = () => {
    const {
      deleteFieldPhoneEditing, phoneN1Form, phoneN2Form, phoneN3Form,
    } = this.props
    deleteFieldPhoneEditing('add', phoneN1Form, phoneN2Form, phoneN3Form)
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
            addFieldPhone={this.addFieldPhone}
            deleteFieldPhone={this.deleteFieldPhone}
            name='phoneArray'
          />
          <div className={cx('userFormBox__addPhone')} />
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

ContactsEditing.propTypes = {
  id: PropTypes.number,
  contactsEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userEditState: PropTypes.func.isRequired,
  deleteFieldPhoneEditing: PropTypes.func.isRequired,
  phoneN1Form: PropTypes.string,
  phoneN2Form: PropTypes.string,
  phoneN3Form: PropTypes.string,
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

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const selector = formValueSelector('ContactsEditing')
  const phoneN1Form = selector(state, 'phoneN1')
  const phoneN2Form = selector(state, 'phoneN2')
  const phoneN3Form = selector(state, 'phoneN3')
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
  } = state.editUserReducer.editUser
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
    },
    id,
    phoneN1Form,
    phoneN2Form,
    phoneN3Form,
  }
}

export default connect(
  mapStateToProps,
  { contactsEditingSave, userEditState, deleteFieldPhoneEditing },
)(ContactsEditingForm)
