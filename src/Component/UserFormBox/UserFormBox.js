import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './UserFormBox.scss'

const cx = classNames.bind(styles)

export const UserFormBox = ({
  handleSubmit, children, classForm,
}) => (
  <form className={cx('userFormBox', classForm)} onSubmit={handleSubmit}>
    {children.map(child => (
      child
    ))
  }
  </form>
)


UserFormBox.propTypes = {
  classForm: PropTypes.string,
  children: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
