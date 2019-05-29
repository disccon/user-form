import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { createUser } from '../../../actions/actionNewUser'
import styles from './NoHaveUserRow.scss'

const cx = classNames.bind(styles)

const NoHaveUserRow = ({ createUser }) => (
  <Fragment>
    <h2 className={cx('usersPage__noUsersH2')}>
    No users here :(
    </h2>
    <button type='button' className={cx('usersPage__createUserButton')} onClick={createUser}>Create new user</button>
  </Fragment>
)

NoHaveUserRow.propTypes = {
  createUser: PropTypes.func.isRequired,
}

export default connect(
  null,
  { createUser },
)(NoHaveUserRow)
