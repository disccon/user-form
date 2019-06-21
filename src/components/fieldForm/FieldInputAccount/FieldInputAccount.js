import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { ReactComponent as VisibilityIcon } from '../../../img/icon/visibility.svg'
import { ReactComponent as VisibilityOffIcon } from '../../../img/icon/visibilityOff.svg'
import './FieldInputAccount.scss'
import Label from '../../Label/Label'

const FieldInputAccount = ({
  input, type, meta: { touched, error }, label, isVisibility, idInput, changeTypePassword,
}) => {
  const visibilityIcon = type === 'text'
    ? <VisibilityIcon className='inputAccount__visibilityIcon' onClick={changeTypePassword} />
    : <VisibilityOffIcon className='inputAccount__visibilityIcon' onClick={changeTypePassword} />
  return (
    <div className='inputAccount'>
      <Label htmlFor={idInput} className='inputAccount__label'>{label}</Label>
      <div className='inputAccount__wrapperInput'>
        {isVisibility && visibilityIcon}
        <input
          {...input}
          className={cn('inputAccount__input', { inputNewUser__errorInput: touched && error })}
          type={type}
          id={idInput}
        />
      </div>
      {touched && error && <p className='inputAccount__pError'>{error}</p>}
    </div>
  )
}

FieldInputAccount.propTypes = {
  idInput: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  isVisibility: PropTypes.bool,
  changeTypePassword: PropTypes.func,
}

export default FieldInputAccount
