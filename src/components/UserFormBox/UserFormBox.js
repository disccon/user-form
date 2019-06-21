import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './UserFormBox.scss'

const UserFormBox = ({
  handleSubmit, children, classForm,
}) => (
  <form className={cn('userFormBox', classForm)} onSubmit={handleSubmit}>
    {children}
  </form>
)

UserFormBox.propTypes = {
  classForm: PropTypes.string,
  children: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default UserFormBox
