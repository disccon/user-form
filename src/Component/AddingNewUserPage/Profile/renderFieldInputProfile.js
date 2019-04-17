import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Profile.scss'

const cx = classNames.bind(styles)


export const renderFieldInputProfile = ({
  input, meta: { touched, error }, label, type, className, idField,
}) => (
  <label className={cx('profile__label')} htmlFor={idField}>
    <h4>{label}</h4>
    <span>*</span>
    <input {...input} type={type} className={className} id={idField} />
    {touched && error && <p>{error}</p>}
  </label>
)

renderFieldInputProfile.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  idField: PropTypes.string,
}
