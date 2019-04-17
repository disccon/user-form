import React, { Fragment } from 'react'
import PropTypes from 'prop-types'


export const renderFieldRadioProfile = ({
  input, meta: { touched, error }, label, type, name, idField,
}) => (
  <Fragment>
    <label htmlFor={idField}>
      <input
        id={idField}
        {...input}
        type={type}
        name={name}
      />
      <span>{label}</span>
    </label>
    {input.value === 'female' && touched && error && <p>{error}</p>}
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
