import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { createUser } from '../../../Actions'
import styles from '../ListUsersPage.scss'


const cx = classNames.bind(styles)

const NoHaveUserRow = ({ createUser }) => (
  <Fragment>
    <h2 className={cx('noUsersH2')}>
    No users here :(
    </h2>
    <button type='button' className={cx('createUserButton')} onClick={createUser}>Create new user</button>
  </Fragment>
)

NoHaveUserRow.propTypes = {
  createUser: PropTypes.func.isRequired,
}

export default connect(
  null,
  { createUser },
)(NoHaveUserRow)