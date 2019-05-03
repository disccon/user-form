import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { capabilitiesEditingSave } from '../../../Actions'
import styles from './CapabilitiesEditing.scss'
import { renderFieldSelectCapabilities } from './renderFieldSelectCapabilities/renderFieldSelectCapabilities'
import { renderFieldTextareaCapabilities } from './renderFieldTextareaCapabilities/renderFieldTextareaCapabilities'
import { renderFieldCheckboxCapabilities } from './renderFieldCheckboxCapabilities/renderFieldCheckboxCapabilities'

const cx = classNames.bind(styles)

class CapabilitiesEditing extends Component {
  onSubmit = values => {
    const { capabilitiesEditingSave, id } = this.props
    capabilitiesEditingSave(values.selectSkills, values.textareaField, values.checkboxArt, values.checkboxSport,
      values.checkboxJustWant, values.checkboxFemale, values.checkboxGuitar, values.checkboxWtf, id)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form className={cx('capabilities')} onSubmit={handleSubmit(this.onSubmit)}>
        <div className={cx('capabilities__sideLeft')}>
          <Field
            component={renderFieldSelectCapabilities}
            name='selectSkills'
            label='Skills'
          />
          <Field
            component={renderFieldTextareaCapabilities}
            name='textareaField'
            label='Additional information'
            idTextarea='idFieldTextarea'
          />
        </div>
        <div className={cx('capabilities__sideRight')}>
          <h3 className={cx('capabilities__hobbies')}>My hobbies</h3>
          <Field
            component={renderFieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxArt'
            span='Art'
          />
          <Field
            component={renderFieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxSport'
            span='Sport,fitness, aerobica and staff like that'
          />
          <Field
            component={renderFieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxJustWant'
            span='just want to play games, I’m not living in this life'
          />
          <Field
            component={renderFieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxFemale'
            span='I’m a female... I’m doing nothing. Every day.'
          />
          <Field
            component={renderFieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxGuitar'
            span='Guitar, guitar and guitar again. I’m fall in love with it.'
          />
          <Field
            component={renderFieldCheckboxCapabilities}
            type='checkbox'
            name='checkboxWtf'
            span='WTF is “hobbies”???'
          />
          <button type='submit' className={cx('saveNewListButton')}>
              Save
          </button>
        </div>
      </form>
    )
  }
}

CapabilitiesEditing.propTypes = {
  id: PropTypes.number.isRequired,
  capabilitiesEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

CapabilitiesEditing = reduxForm({
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

const mapStateToProps = state => {
  const { users } = state.listUsers
  const { pathname } = state.router.location
  const id = Number(pathname.slice(9, pathname.indexOf('/', 9)))
  const user = { ...users[id - 1] }
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale,
    checkboxGuitar, checkboxWtf,
  } = user
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
  { capabilitiesEditingSave },
)(CapabilitiesEditing)
