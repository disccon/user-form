import React from 'react'
import PropTypes from 'prop-types'
import './FieldCheckboxCapabilities.scss'
import Label from '../../Label/Label'

const FieldCheckboxCapabilities = ({
  type, input, meta: { touched, error }, label, idCheckbox,
}) => {
  const changeValue = input.value ? '' : label
  return (
    <Label htmlFor={idCheckbox} className='checkboxCapabilities__label'>
      <input
        id={idCheckbox}
        className='checkboxCapabilities__input'
        {...input}
        type={type}
        onBlur={() => input.onBlur()}
        onChange={() => input.onChange(changeValue)}
      />
      <span className='checkboxCapabilities__span'>{label}</span>
      {touched && error && <p className='checkboxCapabilities__pError'>{error}</p>}
    </Label>
  )
}

FieldCheckboxCapabilities.propTypes = {
  idCheckbox: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
}

export default FieldCheckboxCapabilities
