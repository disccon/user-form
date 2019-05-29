import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import classNames from 'classnames'
import { createUser } from '../../../actions/actionNewUser'
import styles from './NoHaveUserRow.scss'

const cx = classNames.bind(styles)


class NoHaveUserRow extends Component {
  createUser = () => {
    const { createUser, push } = this.props
    push('/')
    createUser()
  }

  render() {
    return (
      <Fragment>
        <h2 className={cx('usersPage__noUsersH2')}>
          No users here :(
        </h2>
        <button type='button' className={cx('usersPage__createUserButton')} onClick={this.createUser}>
          Create new user
        </button>
      </Fragment>
    )
  }
}

NoHaveUserRow.propTypes = {
  createUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(
  null,
  { createUser, push },
)(NoHaveUserRow)
