import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import styles from './NoHaveUserRow.scss'

const cx = classNames.bind(styles)

const NoHaveUserRow = () => (
  <Fragment>
    <h2 className={cx('usersPage__noUsersH2')}>
        No users here :(
    </h2>
    <Link to='/' >
      <button type='button' className={cx('usersPage__createUserButton')} >
          Create new user
      </button>
    </Link>
  </Fragment>
)

export default NoHaveUserRow
