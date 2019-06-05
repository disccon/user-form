import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { formValueSelector } from 'redux-form'
import _ from 'lodash/core'
import { forwardCapabilities, saveNewUserData } from '../../../actions/actionNewUser'
import styles from '../../../components/UserFormBox/UserFormBox.scss'
import CapabilitiesForm from '../../../components/UserFormBox/CapabilitiesForm/CapabilitiesForm'

const cx = classNames.bind(styles)

class CreateUserCapabilities extends Component {
  onSubmit = values => {
    const { push, forwardCapabilities } = this.props
    forwardCapabilities(values)
    push('/users')
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
    const wrapperButton = (
      <Fragment>
        <button type='button' onClick={this.backCapabilities} className={cx('userFormBox__back')}>Back</button>
        <button type='submit' className={cx('userFormBox__forward')}>Forward</button>
      </Fragment>
    )
    return (
      <CapabilitiesForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['selectSkills', 'textareaField', 'checkboxArt', 'checkboxSport',
          'checkboxJustWant', 'checkboxFemale', 'checkboxGuitar', 'checkboxWtf'])}
      />
    )
  }
}

CreateUserCapabilities.propTypes = {
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
  forwardCapabilities: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  saveNewUserData: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const selector = formValueSelector('CapabilitiesForm')
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
    selectSkills,
    textareaField,
    checkboxArt,
    checkboxSport,
    checkboxJustWant,
    checkboxFemale,
    checkboxGuitar,
    checkboxWtf,
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
  { forwardCapabilities, push, saveNewUserData },
)(CreateUserCapabilities)
