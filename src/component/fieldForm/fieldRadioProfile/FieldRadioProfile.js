import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './FieldRadioProfile.scss'

const cx = classNames.bind(styles)

export const renderFieldRadioProfile = ({
  input, meta: { touched, error }, label, type, name, idField,
}) => (
  <Fragment>
    <label className={cx('radioProfile')} htmlFor={idField}>
      <input
        {...input}
        className={cx('radioProfile__input')}
        id={idField}
        type={type}
        name={name}
      />
      <span className={cx('radioProfile__span')}>{label}</span>
    </label>
    {input.value === 'female' && touched && error && <p className={cx('radioProfile__pError')}>{error}</p>}
  </Fragment>
)

renderFieldRadioProfile.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  idField: PropTypes.string,
}
