import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import InputMask from 'react-input-mask'
import './FieldInputNewUser.scss'
import Label from '../../Label/Label'

const FieldInputNewUser = ({
  label, input, type, meta: { touched, error }, visibleStar, placeholder,
  idField, classNameLabel, mask,
}) => {
  const inputRender = mask ? (
    <InputMask
      {...input}
      type={type}
      className={cn('inputNewUser__input', { inputNewUser__errorInput: touched && error })}
      mask={mask}
      placeholder={placeholder}
      id={idField}
    />
  )
    : (
      <input
        {...input}
        type={type}
        className={cn('inputNewUser__input', { inputNewUser__errorInput: touched && error })}
        placeholder={placeholder}
        id={idField}
      />
    )
  return (
    <div className={classNameLabel}>
      <div className='inputNewUser__wrapperLabel'>
        <Label htmlFor={idField} className='inputNewUser__H4'>{label}</Label>
        {visibleStar && <Label htmlFor={idField} className='inputNewUser__span'>*</Label>}
      </div>
      {inputRender}
      {touched && error && <p className='inputNewUser__pError'>{error}</p>}
    </div>
  )
}

FieldInputNewUser.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  classNameLabel: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  visibleStar: PropTypes.bool,
  placeholder: PropTypes.string,
  mask: PropTypes.string,
  idField: PropTypes.string.isRequired,
}

export default FieldInputNewUser
