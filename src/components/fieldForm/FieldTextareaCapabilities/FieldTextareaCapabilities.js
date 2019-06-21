import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './FieldTextareaCapabilities.scss'
import Label from '../../Label/Label'

const FieldTextareaCapabilities = ({
  label, input, meta: { touched, error }, idTextarea,
}) => (
  <div className='fieldTextareaCapabilities'>
    <Label htmlFor={idTextarea} >{label}</Label>
    <textarea
      className={cn('fieldTextareaCapabilities__textarea',
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
    {touched && error && <p className='fieldTextareaCapabilities__pError'>{error}</p>}
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
