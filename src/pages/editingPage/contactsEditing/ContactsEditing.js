import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm, FieldArray } from 'redux-form'
import styles from '../../../components/userFormBox/UserFormBox.scss'
import { saveChangesContactsEditing, fetchEditUser } from '../../../actions/actionEditUser'
import UserFormBox from '../../../components/userFormBox/UserFormBox'
import FieldInputNewUser from '../../../components/fieldForm/fieldInputNewUser/FieldInputNewUser'
import FieldSelectContacts from '../../../components/fieldForm/fieldSelectContacts/FieldSelectContacts'
import FieldArrayPhone from '../../../components/fieldForm/fieldArrayPhone/FieldArrayPhone'

const cx = classNames.bind(styles)

class ContactsEditing extends Component {
  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  onSubmit = values => {
    const { saveChangesContactsEditing, id } = this.props
    saveChangesContactsEditing(values.company, values.githubLink, values.facebookLink, values.selectLanguage,
      values.fax, values.phoneArray, id)
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
  saveChangesContactsEditing: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fetchEditUser: PropTypes.func.isRequired,
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
    company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
  } = state.editUserReducer.editUser
  return {
    initialValues: {
      company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
    },
    id,
  }
}

export default connect(
  mapStateToProps,
  { saveChangesContactsEditing, fetchEditUser },
)(ContactsEditingForm)
