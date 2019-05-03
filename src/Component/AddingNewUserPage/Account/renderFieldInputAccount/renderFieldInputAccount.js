import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as VisibilityIcon } from '../../../../img/icon/visibility.svg'
import { ReactComponent as VisibilityOffIcon } from '../../../../img/icon/visibilityOff.svg'
import styles from './renderFieldInputAccount.scss'

const cx = classNames.bind(styles)

export const renderFieldInputAccount = ({
  input, type, meta: { touched, error }, label, isVisibility, idInput, changeTypePassword,
}) => {
  const visibilityIcon = type === 'text'
    ? <VisibilityIcon className={cx('inputAccount__visibilityIcon')} onClick={changeTypePassword} />
    : <VisibilityOffIcon className={cx('inputAccount__visibilityIcon')} onClick={changeTypePassword} />
  return (
    <div className={cx('inputAccount')}>
      <label htmlFor={idInput} className={cx('inputAccount__label')}>{label}</label>
      {isVisibility && visibilityIcon}
      <input
        {...input}
        className={cx('inputAccount__input', { inputNewUser__errorInput: touched && error })}
        type={type}
        id={idInput}
      />
      {touched && error && <p className={cx('inputAccount__pError')}>{error}</p>}
    </div>
  )
}

renderFieldInputAccount.propTypes = {
  idInput: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  isVisibility: PropTypes.bool,
  changeTypePassword: PropTypes.func,
}
