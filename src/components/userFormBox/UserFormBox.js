import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './UserFormBox.scss'

const cx = classNames.bind(styles)

const UserFormBox = ({
  handleSubmit, children, classForm,
}) => (
  <form className={cx('userFormBox', classForm)} onSubmit={handleSubmit}>
    {children}
  </form>
)

UserFormBox.propTypes = {
  classForm: PropTypes.string,
  children: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default UserFormBox
