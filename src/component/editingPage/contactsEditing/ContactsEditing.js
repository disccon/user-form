import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {
  Field, reduxForm, FieldArray,
} from 'redux-form'
import styles from '../../userFormBox/UserFormBox.scss'
import { contactsEditingSave, userEditState, deleteFieldPhoneEditing } from '../../../actions'
import { UserFormBox } from '../../userFormBox/UserFormBox'
import { fieldInputNewUser } from '../../fieldForm/fieldInputNewUser/FieldInputNewUser'
import { fieldSelectContacts } from '../../fieldForm/fieldSelectContacts/FieldSelectContacts'
import { fieldArrayPhone } from '../../fieldForm/fieldArrayPhone/FieldArrayPhone'
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
    const { deleteFieldPhoneEditing, id } = this.props
    deleteFieldPhoneEditing('delete', id)
  }

  addFieldPhone = () => {
    const { deleteFieldPhoneEditing, id } = this.props
    deleteFieldPhoneEditing('add', id)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <UserFormBox handleSubmit={handleSubmit(this.onSubmit)}>
        <div className={cx('userFormBox__sideLeft')}>
          <Field
            component={fieldInputNewUser}
            type='text'
            label='Company'
            name='company'
            idField='fieldCompany'
            classNameLabel='inputNewUser'
          />
          <Field
            component={fieldInputNewUser}
            type='text'
            span
            label='Github link'
            name='githubLink'
            idField='fieldGithubLink'
            classNameLabel='inputNewUser'
          />
          <Field
            component={fieldInputNewUser}
            type='text'
            span
            label='Facebook link'
            name='facebookLink'
            placeholder='www.facebook.com/hdfk_142_23lelf/'
            idField='fieldFacebookLink'
            classNameLabel='inputNewUser'
          />
          <Field
            component={fieldSelectContacts}
            name='selectLanguage'
            label='Main language'
          />
        </div>
        <div className={cx('userFormBox__sideRight')}>
          <Field
            component={fieldInputNewUser}
            type='text'
            label='Fax'
            name='fax'
            mask='+7 (999) 999-99-99'
            idField='fieldFax'
            classNameLabel='inputNewUser'
          />
          <FieldArray
            component={fieldArrayPhone}
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
  const {
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
  } = state.editUserState.editUser
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
    },
    id,
  }
}

export default connect(
  mapStateToProps,
  { contactsEditingSave, userEditState, deleteFieldPhoneEditing },
)(ContactsEditingForm)