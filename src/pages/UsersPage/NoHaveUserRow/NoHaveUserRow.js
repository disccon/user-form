import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './NoHaveUserRow.scss'

const NoHaveUserRow = () => (
  <Fragment>
    <h2 className='usersPage__noUsersH2'>
        No users here :(
    </h2>
    <Link to='/' >
      <button type='button' className='usersPage__createUserButton' >
          Create new user
      </button>
    </Link>
  </Fragment>
)

export default NoHaveUserRow
