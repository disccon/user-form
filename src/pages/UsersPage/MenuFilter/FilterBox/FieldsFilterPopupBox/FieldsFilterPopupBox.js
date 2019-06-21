import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import 'react-day-picker/lib/style.css'
import './FieldsFilterPopupBox.scss'

const FieldsFilterPopupBox = ({ children, isPopupShow, closePopup }) => (
  <div className={cn('fieldsFilterPopupBox', { fieldsFilterPopupBoxShow: isPopupShow })} onClick={closePopup}>
    {children}
  </div>
)

FieldsFilterPopupBox.propTypes = {
  children: PropTypes.object.isRequired,
  isPopupShow: PropTypes.bool.isRequired,
  closePopup: PropTypes.func,
}

export default FieldsFilterPopupBox
