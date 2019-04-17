import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
import styles from './Contacts.scss'

const cx = classNames.bind(styles)


export const renderFieldInputContacts = ({
  label, input, type, meta: { touched, error }, className, span, placeholder, mask, idField,
}) => {
  const inputRender = mask ? <InputMask {...input} mask={mask} placeholder={placeholder} id={idField} />
    : <input {...input} type={type} className={className} placeholder={placeholder} id={idField} />
  return (
    <label htmlFor={idField} className={cx('contacts__label')}>
      <h4>{label}</h4>
      {span && <span>*</span>}
      {inputRender}
      {touched && error && <p>{error}</p>}
    </label>
  )
}

renderFieldInputContacts.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  span: PropTypes.string,
  placeholder: PropTypes.string,
  mask: PropTypes.string,
  idField: PropTypes.string.isRequired,
}
