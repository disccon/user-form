import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import InputMask from 'react-input-mask'
import './FieldArrayPhone.scss'
import Label from '../../Label/Label'

const FieldPhone = ({
  input, meta: { touched, error }, label, type, isVisibilityDeleteField, placeholder, idField, deleteFieldPhone,
}) => (
  <div className='arrayPhone__fieldPhone'>
    {isVisibilityDeleteField && (
    <button
      type='button'
      onClick={deleteFieldPhone}
      className='arrayPhone__buttonDeleteField'
    />
    )}
    <Label htmlFor={idField} className='arrayPhone__labelPhone'>{label}</Label>
    <InputMask
      {...input}
      className={cn('arrayPhone__inputMask', { arrayPhone__inputMaskError: touched && error })}
      type={type}
      mask='+7 (999) 999-99-99'
      placeholder={placeholder}
      id={idField}
    />
    {touched && error && <p className='arrayPhone__pError'>{error}</p>}
  </div>
)

FieldPhone.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  isVisibilityDeleteField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder: PropTypes.string,
  idField: PropTypes.string.isRequired,
  deleteFieldPhone: PropTypes.func,
}

export default FieldPhone
