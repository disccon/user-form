import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as VisibilityIcon } from '../../../img/icon/visibility.svg'
import { ReactComponent as VisibilityOffIcon } from '../../../img/icon/visibilityOff.svg'
import styles from './Account.scss'


const cx = classNames.bind(styles)

export const renderFieldInput = ({
  label, input, type, meta: { touched, error }, isVisibility, changeTypePassword, idInput,
}) => {
  const visibilityIcon = type === 'text'
    ? <VisibilityIcon className={cx('accountComponent__visibilityIcon')} onClick={changeTypePassword} />
    : <VisibilityOffIcon className={cx('accountComponent__visibilityIcon')} onClick={changeTypePassword} />
  return (
    <label htmlFor={idInput} >
      <h4>{label}</h4>
      {isVisibility && visibilityIcon}
      <div>
        <input {...input} type={type} id={idInput} />
        {touched && error && <p>{error}</p>}
      </div>
    </label>
  )
}

renderFieldInput.propTypes = {
  idInput: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  isVisibility: PropTypes.bool,
  changeTypePassword: PropTypes.func,
}
