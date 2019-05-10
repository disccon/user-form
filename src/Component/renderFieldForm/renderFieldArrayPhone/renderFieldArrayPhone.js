import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import styles from './renderFieldArrayPhone.scss'
import { renderFieldPhone } from './renderFieldPhone'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { deleteAddFieldPhone } from '../../../Actions'

const cx = classNames.bind(styles)

class renderFieldArrayPhone extends Component {
  addFieldPhone = () => {
    const { deleteAddFieldPhone } = this.props
    deleteAddFieldPhone('add')
  }

  render() {
    const {
      fields, deleteAddFieldPhone,
    } = this.props
    return (
      <Fragment>
        { fields.map((hobby, index) => (
          <Field
            key={index}
            name={`phoneN${index + 1}`}
            type='text'
            component={renderFieldPhone}
            isVisibilityDeleteField={fields.length > 1}
            deleteFieldPhone={deleteAddFieldPhone}
            label={`Phone #${index + 1}`}
            idField={`phone #${index + 1}`}
          />
        ))
        }
        {fields.length !== 3 && (
        <button type='button' className={cx('arrayPhone__addPhoneField')} onClick={this.addFieldPhone}>
          <AddIcon className={cx('arrayPhone__addIcon')} />
          <span className={cx('arrayPhone__span')}>add phone number</span>
        </button>
        )}
      </Fragment>
    )
  }
}

renderFieldArrayPhone.propTypes = {
  fields: PropTypes.object.isRequired,
  deleteAddFieldPhone: PropTypes.func,
}

export default connect(
  null,
  { deleteAddFieldPhone },
)(renderFieldArrayPhone)
