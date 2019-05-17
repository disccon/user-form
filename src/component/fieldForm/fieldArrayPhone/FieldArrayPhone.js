import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field } from 'redux-form'
import styles from './FieldArrayPhone.scss'
import { FieldPhone } from './FieldPhone'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'

const cx = classNames.bind(styles)


export const FieldArrayPhone = ({ fields, addFieldPhone, deleteFieldPhone }) => (
  <Fragment>
    {fields.map((hobby, index) => (
      <Field
        key={index}
        name={`phoneN${index + 1}`}
        type='text'
        component={FieldPhone}
        deleteFieldPhone={deleteFieldPhone}
        isVisibilityDeleteField={fields.length > 1}
        label={`Phone #${index + 1}`}
        idField={`phone #${index + 1}`}
      />
    ))
    }
    {fields.length !== 3 && (
      <button type='button' className={cx('arrayPhone__addPhoneField')} onClick={addFieldPhone}>
        <AddIcon className={cx('arrayPhone__addIcon')} />
        <span className={cx('arrayPhone__span')}>add phone number</span>
      </button>
    )}
  </Fragment>
)


FieldArrayPhone.propTypes = {
  fields: PropTypes.object.isRequired,
  addFieldPhone: PropTypes.func.isRequired,
  deleteFieldPhone: PropTypes.func.isRequired,
}
