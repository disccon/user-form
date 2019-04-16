import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { backCapabilities, forwardCapabilities } from '../../../Actions'
import styles from './Capabilities.scss'
import { renderFieldSelect } from './renderFieldSelect'


const cx = classNames.bind(styles)


const renderFieldTextarea = ({ label, input, meta: { touched, error } }) => (
  <label>
    <h4>{label}</h4>
    <textarea
      {...input}
      onBlur={() => input.onBlur()}
      onChange={input.onChange}
      value={input.value}
      rows='10'
      cols='45'
      name='text'
      maxLength='300'
    />
    {touched && error && <p>{error}</p>}
  </label>
)

const renderFieldCheckbox = ({
  type, input, meta: { touched, error }, span,
}) => {
  const changeValue = input.value ? '' : span
  return (
    <label>
      <input
        {...input}
        type={type}
        onChange={() => input.onChange(changeValue)}
      />
      <span>{span}</span>
      {touched && error && <p>{error}</p>}
    </label>
  )
}


class Capabilities extends Component {
    onSubmit = values => {
      const { forwardCapabilities } = this.props
      forwardCapabilities(values.selectSkills, values.textareaField, values.checkboxArt, values.checkboxSport, values.checkboxJustWant,
        values.checkboxFemale, values.checkboxGuitar, values.checkboxWtf)
    }

    backCapabilities = () => {
      const {
        backCapabilities, selectSkillsForm, textareaFieldForm, checkboxArtForm, checkboxSportForm, checkboxJustWantForm, checkboxFemaleForm,
        checkboxGuitarForm, checkboxWtfForm,
      } = this.props
      backCapabilities(selectSkillsForm, textareaFieldForm, checkboxArtForm, checkboxSportForm, checkboxJustWantForm, checkboxFemaleForm,
        checkboxGuitarForm, checkboxWtfForm)
    }

    render() {
      const { handleSubmit } = this.props
      return (
        <form className={cx('capabilities')} onSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('capabilities__sideLeft')}>
            <Field component={renderFieldSelect} name='selectSkills' label='Skills' idInput='selectSkills' />
            <Field component={renderFieldTextarea} name='textareaField' label='Additional information' />
          </div>
          <div className={cx('capabilities__sideRight')}>
            <h3>My hobbies</h3>
            <Field component={renderFieldCheckbox} type='checkbox' name='checkboxArt' span='Art' />
            <Field
              component={renderFieldCheckbox}
              type='checkbox'
              name='checkboxSport'
              span='Sport,fitness, aerobica and staff like that'
            />
            <Field
              component={renderFieldCheckbox}
              type='checkbox'
              name='checkboxJustWant'
              span='just want to play games, I’m not living in this life'
            />
            <Field
              component={renderFieldCheckbox}
              type='checkbox'
              name='checkboxFemale'
              span='I’m a female... I’m doing nothing. Every day.'
            />
            <Field
              component={renderFieldCheckbox}
              type='checkbox'
              name='checkboxGuitar'
              span='Guitar, guitar and guitar again. I’m fall in love with it.'
            />
            <Field
              component={renderFieldCheckbox}
              type='checkbox'
              name='checkboxWtf'
              span='WTF is “hobbies”???'
            />
            <div className={cx('capabilities__wrapperButton')}>
              <button
                type='button'
                className={cx('capabilities__back')}
                onClick={this.backCapabilities}
              >
                Back
              </button>
              <button type='submit' className={cx('capabilities__finish')}>
              Finish
              </button>
            </div>
          </div>
        </form>
      )
    }
}

Capabilities.propTypes = {
  selectSkills: PropTypes.string,
  textareaField: PropTypes.string,
  checkboxArt: PropTypes.string,
  checkboxSport: PropTypes.string,
  checkboxJustWant: PropTypes.string,
  checkboxFemale: PropTypes.string,
  checkboxGuitar: PropTypes.string,
  checkboxWtf: PropTypes.string,
}


Capabilities = reduxForm({
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
    if (!values.checkboxArt && !values.checkboxSport && !values.checkboxJustWant && !values.checkboxFemale && !values.checkboxGuitar && !values.checkboxWtf) {
      errors.checkboxWtf = 'Missing My Hobbies'
    }

    return errors
  },
  form: 'Capabilities',
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
    selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale, checkboxGuitar, checkboxWtf,
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
  { backCapabilities, forwardCapabilities },
)(Capabilities)
