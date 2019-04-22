import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Field } from 'redux-form'
import styles from './Contacts.scss'
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
            isvisibilitiFieldPhone={fields.length > 1}
            deleteFieldPhone={deleteAddFieldPhone}
            label={`Phone #${index + 1}`}
            idField={`phone #${index + 1}`}
          />
        ))
        }
        {fields.length !== 3 && (
        <button type='button' className={cx('contacts__addPhoneField')} onClick={this.addFieldPhone}>
          <AddIcon className={cx('contacts__addIcon')} />
          <span>add phone number</span>
        </button>
        )}
      </Fragment>
    )
  }
}

// export const renderFieldArrayPhone = ({ fields, meta: { error }, deleteFieldPhone, isvisibilitiFieldPhone }) => {
//     console.log(1111, fields)
//       return(
//       <Fragment>
//         { fields.map((hobby, index) => (
//       <Field
//         name={hobby}
//         type='text'
//         component={renderFieldPhone}
//         isvisibilitiFieldPhone={fields.length > 1}
//         deleteFieldPhone={deleteFieldPhone}
//         label={`Phone #${index + 1}`}
//       />
//       ))
//     }
//         <button type='button' className={cx('contacts__addPhoneField')} onClick={this.addFieldPhone}>
//               <AddIcon className={cx('contacts__addIcon')} />
//              <span>add phone number</span>
//          </button>
//       </Fragment>
//     )
// }

// export const renderFieldArrayPhone = ({
//   input, meta: { touched, error }, label, type, isvisibilitiFieldPhone, placeholder, idField, deleteFieldPhone,
// }) => (
//   <div className={cx('contacts__labelPhone')}>
//     {isvisibilitiFieldPhone && <button type='button' onClick={deleteFieldPhone} />}
//     <label htmlFor={idField}>
//       <h4>{label}</h4>
//       <InputMask {...input} type={type} mask='+7 (999) 999-99-99' placeholder={placeholder} id={idField} />
//       {touched && error && <p>{error}</p>}
//     </label>
//   </div>
// )

renderFieldArrayPhone.propTypes = {
  fields: PropTypes.object.isRequired,
  deleteAddFieldPhone: PropTypes.func,
}


export default connect(
  null,
  { deleteAddFieldPhone },
)(renderFieldArrayPhone)
