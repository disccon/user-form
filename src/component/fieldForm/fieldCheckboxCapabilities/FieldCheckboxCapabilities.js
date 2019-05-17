import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './FieldCheckboxCapabilities.scss'

const cx = classNames.bind(styles)

export const fieldCheckboxCapabilities = ({
  type, input, meta: { touched, error }, span, idCheckbox,
}) => {
  const changeValue = input.value ? '' : span
  return (
    <label htmlFor={idCheckbox} className={cx('checkboxCapabilities__label')}>
      <input
        id={idCheckbox}
        className={cx('checkboxCapabilities__input')}
        {...input}
        type={type}
        onBlur={() => input.onBlur()}
        onChange={() => input.onChange(changeValue)}
      />
      <span className={cx('checkboxCapabilities__span')}>{span}</span>
      {touched && error && <p className={cx('checkboxCapabilities__pError')}>{error}</p>}
    </label>
  )
}

fieldCheckboxCapabilities.propTypes = {
  idCheckbox: PropTypes.string,
  label: PropTypes.string,
  span: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
}
