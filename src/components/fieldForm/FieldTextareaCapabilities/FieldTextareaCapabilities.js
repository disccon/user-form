import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './FieldTextareaCapabilities.scss'

const cx = classNames.bind(styles)

const FieldTextareaCapabilities = ({
  label, input, meta: { touched, error }, idTextarea,
}) => (
  <div className={cx('fieldTextareaCapabilities')}>
    <label htmlFor={idTextarea} >{label}</label>
    <textarea
      className={cx('fieldTextareaCapabilities__textarea',
        { fieldTextareaCapabilities__textareaError: touched && error })}
      id={idTextarea}
      {...input}
      onBlur={() => input.onBlur()}
      onChange={input.onChange}
      value={input.value}
      rows='10'
      cols='45'
      name='text'
      maxLength='300'
    />
    {touched && error && <p className={cx('fieldTextareaCapabilities__pError')}>{error}</p>}
  </div>
)

FieldTextareaCapabilities.propTypes = {
  idInput: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  idTextarea: PropTypes.string.isRequired,
}

export default FieldTextareaCapabilities
