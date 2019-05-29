import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field } from 'redux-form'
import styles from './FieldArrayPhone.scss'
import FieldPhone from './FieldPhone'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'

const cx = classNames.bind(styles)


class FieldArrayPhone extends Component {
  deleteFieldPhone = index => () => {
    const { fields } = this.props
    fields.remove(index)
  }

  addFieldPhone = () => {
    const { fields } = this.props
    fields.push({})
  }

  render() {
    const { fields } = this.props
    return (
      <Fragment>
        {fields.map((phone, index) => (
          <Field
            key={index}
            name={`${phone}.phone`}
            type='text'
            component={FieldPhone}
            deleteFieldPhone={this.deleteFieldPhone(index)}
            isVisibilityDeleteField={fields.length > 1}
            label={`Phone ${index + 1}`}
            idField={`phone ${index + 1}`}
          />

        ))
            }
        {fields.length !== 3 && (
          <button
            type='button'
            className={cx('arrayPhone__addPhoneField')}
            onClick={this.addFieldPhone}
          >
            <AddIcon className={cx('arrayPhone__addIcon')} />
            <span className={cx('arrayPhone__span')}>add phone number</span>
          </button>
        )}
      </Fragment>
    )
  }
}

FieldArrayPhone.propTypes = {
  fields: PropTypes.object.isRequired,
}

export default FieldArrayPhone
