import React from 'react'
import PropTypes from 'prop-types'



const renderFieldTextarea = ({ label, input, meta: { touched, error } }) => (
    <label>
        <h4>{label}</h4>
        <textarea
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


renderFieldInput.propTypes = {
    idInput: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
}