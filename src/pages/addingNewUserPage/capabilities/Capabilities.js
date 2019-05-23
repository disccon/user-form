import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import {
  saveNewUserData,
  forwardCapabilities,
} from '../../../actions/actionNewUser'
import styles from '../../../components/userFormBox/UserFormBox.scss'
import FieldSelectCapabilities
  from '../../../components/fieldForm/fieldSelectCapabilities/FieldSelectCapabilities'
import FieldTextareaCapabilities
  from '../../../components/fieldForm/fieldTextareaCapabilities/FieldTextareaCapabilities'
import UserFormBox from '../../../components/userFormBox/UserFormBox'
import FieldCheckboxCapabilities
  from '../../../components/fieldForm/fieldCheckboxCapabilities/FieldCheckboxCapabilities'

const cx = classNames.bind(styles)

class Capabilities extends Component {
  onSubmit = values => {
    const { forwardCapabilities } = this.props
    forwardCapabilities(values.selectSkills, values.textareaField, values.checkboxArt, values.checkboxSport,
      values.checkboxJustWant, values.checkboxFemale, values.checkboxGuitar, values.checkboxWtf)
  }

  backCapabilities = () => {
    const {
      saveNewUserData, selectSkillsForm, textareaFieldForm, checkboxArtForm, checkboxSportForm,
      checkboxJustWantForm, checkboxFemaleForm, checkboxGuitarForm, checkboxWtfForm, push,
    } = this.props
    push('/contacts')
    saveNewUserData({
      selectSkills: selectSkillsForm,
      textareaField: textareaFieldForm,
      checkboxArt: checkboxArtForm,
      checkboxSport: checkboxSportForm,
      checkboxJustWant: checkboxJustWantForm,
      checkboxFemale: checkboxFemaleForm,
      checkboxGuitar: checkboxGuitarForm,
      checkboxWtf: checkboxWtfForm,
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
            <button
              type='button'
              className={cx('userFormBox__back')}
              onClick={this.backCapabilities}
            >
              Back
            </button>
            <button type='submit' className={cx('userFormBox__finish')}>
              Finish
            </button>
          </div>
        </div>
      </UserFormBox>
    )
  }
}

Capabilities.propTypes = {
  selectSkillsForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  textareaFieldForm: PropTypes.string,
  checkboxArtForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxSportForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxJustWantForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxFemaleForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxGuitarForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxWtfForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  saveNewUserData: PropTypes.func.isRequired,
  forwardCapabilities: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const CapabilitiesForm = reduxForm({
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
  form: 'Capabilities',
  enableReinitialize: true,
})(Capabilities)

const mapStateToProps = state => {
  const selector = formValueSelector('Capabilities')
  const selectSkillsForm = selector(state, 'selectSkills')
  const textareaFieldForm = selector(state, 'textareaField')
  const checkboxArtForm = selector(state, 'checkboxArt')
  const checkboxSportForm = selector(state, 'checkboxSport')
  const checkboxJustWantForm = selector(state, 'checkboxJustWant')
  const checkboxFemaleForm = selector(state, 'checkboxFemale')
  const checkboxGuitarForm = selector(state, 'checkboxGuitar')
  const checkboxWtfForm = selector(state, 'checkboxWtf')
  const {
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale,
    checkboxGuitar, checkboxWtf,
  } = state.newUser
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
    selectSkillsForm,
    textareaFieldForm,
    checkboxArtForm,
    checkboxSportForm,
    checkboxJustWantForm,
    checkboxFemaleForm,
    checkboxGuitarForm,
    checkboxWtfForm,
  }
}

export default connect(
  mapStateToProps,
  { saveNewUserData, forwardCapabilities, push },
)(CapabilitiesForm)
