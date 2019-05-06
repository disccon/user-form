import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
import styles from './renderFieldInputNewUser.scss'

const cx = classNames.bind(styles)

export const renderFieldInputNewUser = ({
  label, input, type, meta: { touched, error }, span, placeholder,
  idField, classNameLabel, mask,
}) => {
  const inputRender = mask ? (
    <InputMask
      {...input}
      type={type}
      className={cx('inputNewUser__input', { inputNewUser__errorInput: touched && error })}
      mask={mask}
      placeholder={placeholder}
      id={idField}
    />
  )
    : (
      <input
        {...input}
        type={type}
        className={cx('inputNewUser__input', { inputNewUser__errorInput: touched && error })}
        placeholder={placeholder}
        id={idField}
      />
    )
  return (
    <div className={cx(classNameLabel)}>
      <div className={cx('inputNewUser__wrapperLabel')}>
        <label htmlFor={idField} className={cx('inputNewUser__H4')}>{label}</label>
        {span && <label htmlFor={idField} className={cx('inputNewUser__span')}>*</label>}
      </div>
      {inputRender}
      {touched && error && <p className={cx('inputNewUser__pError')}>{error}</p>}
    </div>
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
