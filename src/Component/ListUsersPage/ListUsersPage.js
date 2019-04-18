import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './ListUsersPage.scss'

import { ReactComponent as CloseIcon } from '../../img/icon/close.svg'
import { ReactComponent as EditIcon } from '../../img/icon/edit.svg'
import { editUser, deleteUser, createUser } from '../../Actions'
import db from '../../db'

const cx = classNames.bind(styles)


class ListUsersPage extends Component {
    editUser = user => () => {
      const { editUser } = this.props
      editUser(user)
    }

    deleteUser = idListUser => () => {
      const { deleteUser } = this.props
      console.log(111111, idListUser)
      db.table('listUserDB')
        .delete(idListUser)
      deleteUser(idListUser)
    }

    createUser = () => {
      const { createUser } = this.props
      createUser()
    }

    render() {
      const { users } = this.props
      return (
        <Fragment>
          <h2 className={cx('ListUsersH2')}>List of users</h2>
          <table className={cx('ListUsersTable')}>
            <thead>
              <tr>
                <th>name</th>
                <th>company</th>
                <th>contacts</th>
                <th>last update</th>
              </tr>
            </thead>
            <tbody>
              <tr />
              {users.map(user => (
                <tr key={user.idListUser}>
                  <td>
                    <div className={cx('wrapperUser')}>
                      <img src={user.userSRCAvatarIMG} alt='userSRCAvatarIMG' />
                      <div>
                        <h4>{user.userName}</h4>
                        <span>username</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={cx('wrapperUser')}>{user.company}</div>
                  </td>
                  <td>
                    <div className={cx('wrapperUser')}>{user.email}</div>
                  </td>
                  <td>
                    <div className={cx('wrapperUser')}>
                        3 month ago
                      <button type='button' className={cx('button_editIcon')} onClick={this.editUser(user)}>
                        <EditIcon className={cx('editIcon')} />
                      </button>
                      <button type='button' className={cx('button_closeIcon')}>
                        <CloseIcon className={cx('closeIcon')} onClick={this.deleteUser(user.idListUser)} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0
                    && (
                    <Fragment>
                      <h2 className={cx('noUsersH2')}>
                        No users here :(
                      </h2>
                      <button type='button' className={cx('createUserButton')} onClick={this.createUser}>Create new user</button>
                    </Fragment>
                    )
                }
        </Fragment>
      )
    }
}

ListUsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.listUsers.users,
})

export default connect(
  mapStateToProps,
  { editUser, deleteUser, createUser },
)(ListUsersPage)
