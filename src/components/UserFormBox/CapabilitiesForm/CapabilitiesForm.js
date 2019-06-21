import React from 'react'
import { Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import '../UserFormBox.scss'
import FieldSelectCapabilities from '../../fieldForm/FieldSelectCapabilities/FieldSelectCapabilities'
import FieldTextareaCapabilities from '../../fieldForm/FieldTextareaCapabilities/FieldTextareaCapabilities'
import UserFormBox from '../UserFormBox'
import FieldCheckboxCapabilities from '../../fieldForm/FieldCheckboxCapabilities/FieldCheckboxCapabilities'
import { validateCapabilities } from '../validateForm/validateCapabilities'

const Capabilities = ({ handleSubmit, onSubmit, wrapperButton }) => (
  <UserFormBox handleSubmit={handleSubmit(onSubmit)}>
    <div className='userFormBox__sideLeft'>
      <Field
        component={FieldSelectCapabilities}
        name='skills'
        label='Skills'
      />
      <Field
        component={FieldTextareaCapabilities}
        name='textareaField'
        label='Additional information'
        idTextarea='idFieldTextarea'
      />
    </div>
    <div className='userFormBox__sideRight'>
      <h3 className='userFormBox__hobbies'>My hobbies</h3>
      <Field
        component={FieldCheckboxCapabilities}
        type='checkbox'
        name='checkboxArt'
        label='Art'
      />
      <Field
        component={FieldCheckboxCapabilities}
        type='checkbox'
        name='checkboxSport'
        label='Sport,fitness, aerobica and staff like that'
      />
      <Field
        component={FieldCheckboxCapabilities}
        type='checkbox'
        name='checkboxJustWant'
        label='just want to play games, I’m not living in this life'
      />
      <Field
        component={FieldCheckboxCapabilities}
        type='checkbox'
        name='checkboxFemale'
        label='I’m a female... I’m doing nothing. Every day.'
      />
      <Field
        component={FieldCheckboxCapabilities}
        type='checkbox'
        name='checkboxGuitar'
        label='Guitar, guitar and guitar again. I’m fall in love with it.'
      />
      <Field
        component={FieldCheckboxCapabilities}
        type='checkbox'
        name='checkboxWtf'
        label='WTF is “hobbies”???'
      />
      <div className='userFormBox__wrapperButton'>
        {wrapperButton}
      </div>
    </div>
  </UserFormBox>
)

Capabilities.propTypes = {
  wrapperButton: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const CapabilitiesForm = reduxForm({
  validate: validateCapabilities,
  form: 'CapabilitiesForm',
  enableReinitialize: true,
  touchOnBlur: false,
})(Capabilities)


export default CapabilitiesForm
