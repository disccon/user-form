import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
import styles from './renderFieldArrayPhone.scss'

const cx = classNames.bind(styles)

export const renderFieldPhone = ({
  input, meta: { touched, error }, label, type, isVisibilityDeleteField, placeholder, idField, deleteFieldPhone,
}) => (
  <div className={cx('arrayPhone__fieldPhone')}>
    {isVisibilityDeleteField && (
    <button
      type='button'
      onClick={deleteFieldPhone}
      className={cx('arrayPhone__buttonDeleteField')}
    />
    )}
    <label htmlFor={idField} className={cx('arrayPhone__labelPhone')}>{label}</label>
    <InputMask
      {...input}
      className={cx('arrayPhone__inputMask', { arrayPhone__inputMaskError: touched && error })}
      type={type}
      mask='+7 (999) 999-99-99'
      placeholder={placeholder}
      id={idField}
    />
    {touched && error && <p className={cx('arrayPhone__pError')}>{error}</p>}
  </div>
)

renderFieldPhone.propTypes = {
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
