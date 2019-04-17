import React from 'react'
import PropTypes from 'prop-types'


export const renderFieldCheckboxCapabilities = ({
  type, input, meta: { touched, error }, span, idCheckbox,
}) => {
  const changeValue = input.value ? '' : span
  return (
    <label htmlFor={idCheckbox}>
      <input
        id={idCheckbox}
        {...input}
        type={type}
        onChange={() => input.onChange(changeValue)}
      />
      <span>{span}</span>
      {touched && error && <p>{error}</p>}
    </label>
  )
}

renderFieldCheckboxCapabilities.propTypes = {
  idCheckbox: PropTypes.string,
  label: PropTypes.string,
  span: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  idTextarea: PropTypes.string.isRequired,
}
