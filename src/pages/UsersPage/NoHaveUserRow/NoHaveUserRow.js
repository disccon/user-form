import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import classNames from 'classnames'
import styles from './NoHaveUserRow.scss'

const cx = classNames.bind(styles)

const NoHaveUserRow = ({ push }) => {
  const pushCreateUser = () => {
    push('/')
  }

  return (
    <Fragment>
      <h2 className={cx('usersPage__noUsersH2')}>
        No users here :(
      </h2>
      <button type='button' className={cx('usersPage__createUserButton')} onClick={pushCreateUser}>
        Create new user
      </button>
    </Fragment>
  )
}

NoHaveUserRow.propTypes = {
  push: PropTypes.func.isRequired,
}

export default connect(
  null,
  { push },
)(NoHaveUserRow)
