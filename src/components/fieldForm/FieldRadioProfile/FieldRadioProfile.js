import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import './FieldRadioProfile.scss'
import Label from '../../Label/Label'

const FieldRadioProfile = ({
  input, meta: { touched, error }, label, type, name, idField,
}) => (
  <Fragment>
    <Label className='radioProfile' htmlFor={idField}>
      <input
        {...input}
        className='radioProfile__input'
        id={idField}
        type={type}
        name={name}
      />
      <span className='radioProfile__span'>{label}</span>
    </Label>
    {input.value === 'female' && touched && error && <p className='radioProfile__pError'>{error}</p>}
  </Fragment>
)

FieldRadioProfile.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  idField: PropTypes.string,
}

export default FieldRadioProfile
