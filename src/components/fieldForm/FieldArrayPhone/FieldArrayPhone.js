import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FieldArrayPhone.scss'
import FieldPhone from './FieldPhone'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'

const FieldArrayPhone = ({ fields }) => {
  const deleteFieldPhone = index => () => {
    fields.remove(index)
  }

  const addFieldPhone = () => {
    fields.push({})
  }

  return (
    <Fragment>
      {fields.map((phone, index) => (
        <Field
          key={index}
          name={`${phone}.phone`}
          type='text'
          component={FieldPhone}
          deleteFieldPhone={deleteFieldPhone(index)}
          isVisibilityDeleteField={fields.length > 1}
          label={`Phone ${index + 1}`}
          idField={`phone ${index + 1}`}
        />

      ))
      }
      {fields.length !== 3 && (
        <button
          type='button'
          className='arrayPhone__addPhoneField'
          onClick={addFieldPhone}
        >
          <AddIcon className='arrayPhone__addIcon' />
          <span className='arrayPhone__span'>add phone number</span>
        </button>
      )}
    </Fragment>
  )
}


FieldArrayPhone.propTypes = {
  fields: PropTypes.object.isRequired,
}

export default FieldArrayPhone
