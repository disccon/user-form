import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
import styles from './Contacts.scss'


const cx = classNames.bind(styles)

export const renderFieldPhoneContacts = ({
  input, meta: { touched, error }, label, type, span, placeholder, idField, deleteFieldPhone,
}) => (
  <div className={cx('contacts__labelPhone')}>
    {span && <span onClick={deleteFieldPhone} />}
    <label htmlFor={idField}>
      <h4>{label}</h4>
      <InputMask {...input} type={type} mask='+7 (999) 999-99-99' placeholder={placeholder} id={idField} />
      {touched && error && <p>{error}</p>}
    </label>
  </div>
)

renderFieldPhoneContacts.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  span: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder: PropTypes.string,
  idField: PropTypes.string.isRequired,
  deleteFieldPhone: PropTypes.func.isRequired,
}
