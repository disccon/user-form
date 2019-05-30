import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { saveEditUserData, fetchEditUser } from '../../../actions/actionEditUser'
import styles from '../../../components/UserFormBox/UserFormBox.scss'
import FieldSelectCapabilities
  from '../../../components/fieldForm/FieldSelectCapabilities/FieldSelectCapabilities'
import FieldTextareaCapabilities
  from '../../../components/fieldForm/FieldTextareaCapabilities/FieldTextareaCapabilities'
import FieldCheckboxCapabilities
  from '../../../components/fieldForm/FieldCheckboxCapabilities/FieldCheckboxCapabilities'
import UserFormBox from '../../../components/UserFormBox/UserFormBox'

const cx = classNames.bind(styles)

class CapabilitiesEditing extends Component {
  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  onSubmit = values => {
    const { saveEditUserData, id } = this.props
    saveEditUserData(id, {
      selectSkills: values.selectSkills,
      textareaField: values.textareaField,
      checkboxArt: values.checkboxArt,
      checkboxSport: values.checkboxSport,
      checkboxJustWant: values.checkboxJustWant,
      checkboxFemale: values.checkboxFemale,
      checkboxGuitar: values.checkboxGuitar,
      checkboxWtf: values.checkboxWtf,
    })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <UserFormBox handleSubmit={handleSubmit(this.onSubmit)}>
        <div className={cx('userFormBox__sideLeft')}>
          <Field
            component={FieldSelectCapabilities}
            name='selectSkills'
            label='Skills'
          />
          <Field
            component={FieldTextareaCapabilities}
            name='textareaField'
            label='Additional information'
            idTextarea='idFieldTextarea'
          />
        </div>
        <div className={cx('userFormBox__sideRight')}>
          <h3 className={cx('userFormBox__hobbies')}>My hobbies</h3>
          <Field
            component={FieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxArt'
            span='Art'
          />
          <Field
            component={FieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxSport'
            span='Sport,fitness, aerobica and staff like that'
          />
          <Field
            component={FieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxJustWant'
            span='just want to play games, I’m not living in this life'
          />
          <Field
            component={FieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxFemale'
            span='I’m a female... I’m doing nothing. Every day.'
          />
          <Field
            component={FieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxGuitar'
            span='Guitar, guitar and guitar again. I’m fall in love with it.'
          />
          <Field
            component={FieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxWtf'
            span='WTF is “hobbies”???'
          />
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

CapabilitiesEditing.propTypes = {
  id: PropTypes.number,
  saveEditUserData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  fetchEditUser: PropTypes.func.isRequired,
}

const CapabilitiesEditingForm = reduxForm({
  validate: values => {
    const errors = {}

    if (!values.selectSkills) {
      errors.selectSkills = 'Missing Skills'
    } else if (values.selectSkills.length <= 2) {
      errors.selectSkills = 'select at least 3 option'
    }
    if (!values.textareaField) {
      errors.textareaField = 'Missing Additional Information'
    } else if (values.textareaField.length <= 10) {
      errors.textareaField = 'Must be 11 characters or more'
    }
    if (!values.checkboxArt && !values.checkboxSport && !values.checkboxJustWant && !values.checkboxFemale
      && !values.checkboxGuitar && !values.checkboxWtf) {
      errors.checkboxWtf = 'Missing My Hobbies'
    }

    return errors
  },
  form: 'CapabilitiesEditing',
  enableReinitialize: true,
})(CapabilitiesEditing)

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale,
    checkboxGuitar, checkboxWtf,
  } = state.editUserReducer.editUser
  return {
    initialValues: {
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
    },
    id,
  }
}

export default connect(
  mapStateToProps,
  { saveEditUserData, fetchEditUser },
)(CapabilitiesEditingForm)
