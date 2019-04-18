import React from 'react'
import PropTypes from 'prop-types'


export const renderFieldTextareaCapabilities = ({
  label, input, meta: { touched, error }, idTextarea,
}) => (
  <label htmlFor={idTextarea}>
    <h4>{label}</h4>
    <textarea
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
    {touched && error && <p>{error}</p>}
  </label>
)

renderFieldTextareaCapabilities.propTypes = {
  idInput: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  idTextarea: PropTypes.string.isRequired,
}
