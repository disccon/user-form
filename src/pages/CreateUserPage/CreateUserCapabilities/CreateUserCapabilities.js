import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { formValueSelector } from 'redux-form'
import _ from 'lodash/core'
import { forwardCapabilities, saveNewUserData } from '../../../actions/actionNewUser'
import '../../../components/UserFormBox/UserFormBox.scss'
import CapabilitiesForm from '../../../components/UserFormBox/CapabilitiesForm/CapabilitiesForm'

class CreateUserCapabilities extends Component {
  onSubmit = values => {
    const { push, forwardCapabilities } = this.props
    forwardCapabilities(values)
    push('/users')
  }

  backCapabilities = () => {
    const {
      saveNewUserData, skillsForm, textareaFieldForm, checkboxArtForm, checkboxSportForm,
      checkboxJustWantForm, checkboxFemaleForm, checkboxGuitarForm, checkboxWtfForm, push,
    } = this.props
    push('/contacts')
    saveNewUserData({
      skills: skillsForm,
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
    const wrapperButton = (
      <Fragment>
        <button type='button' onClick={this.backCapabilities} className='userFormBox__back'>Back</button>
        <button type='submit' className='userFormBox__forward'>Forward</button>
      </Fragment>
    )
    return (
      <CapabilitiesForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['skills', 'textareaField', 'checkboxArt', 'checkboxSport',
          'checkboxJustWant', 'checkboxFemale', 'checkboxGuitar', 'checkboxWtf'])}
      />
    )
  }
}

CreateUserCapabilities.propTypes = {
  skillsForm: PropTypes.oneOfType([
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
  forwardCapabilities: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  saveNewUserData: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const selector = formValueSelector('CapabilitiesForm')
  const skillsForm = selector(state, 'skills')
  const textareaFieldForm = selector(state, 'textareaField')
  const checkboxArtForm = selector(state, 'checkboxArt')
  const checkboxSportForm = selector(state, 'checkboxSport')
  const checkboxJustWantForm = selector(state, 'checkboxJustWant')
  const checkboxFemaleForm = selector(state, 'checkboxFemale')
  const checkboxGuitarForm = selector(state, 'checkboxGuitar')
  const checkboxWtfForm = selector(state, 'checkboxWtf')
  const {
    skills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale,
    checkboxGuitar, checkboxWtf,
  } = state.newUser
  return {
    skills,
    textareaField,
    checkboxArt,
    checkboxSport,
    checkboxJustWant,
    checkboxFemale,
    checkboxGuitar,
    checkboxWtf,
    skillsForm,
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
  { forwardCapabilities, push, saveNewUserData },
)(CreateUserCapabilities)
