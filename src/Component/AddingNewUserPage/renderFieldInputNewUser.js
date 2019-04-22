import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
import styles from './AddingNewUser.scss'

const cx = classNames.bind(styles)

export const renderFieldInputNewUser = ({
  label, input, type, meta: { touched, error }, span, placeholder,
  idField, classNameLabel, mask,
}) => {
  const inputRender = mask ? <InputMask {...input} mask={mask} placeholder={placeholder} id={idField} />
    : <input {...input} type={type} placeholder={placeholder} id={idField} />
  return (
    <label htmlFor={idField} className={cx(classNameLabel)}>
      <h4>{label}</h4>
      {span && <span>*</span>}
      {inputRender}
      {touched && error && <p>{error}</p>}
    </label>
  )
}

renderFieldInputNewUser.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  classNameLabel: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  span: PropTypes.bool,
  placeholder: PropTypes.string,
  mask: PropTypes.string,
  idField: PropTypes.string.isRequired,
}
