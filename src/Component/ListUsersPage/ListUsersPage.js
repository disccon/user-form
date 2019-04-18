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
  state = {
    pageList: 0,
    deleteList: false,
  }

  editUser = user => () => {
    const { editUser } = this.props
    editUser(user)
  }

  showRemoveUserButton = idListUser => () => {
    this.setState({
      deleteList: idListUser,
    })
  }

    deleteUser = idListUser => () => {
      const { deleteUser } = this.props
      this.setState({
        deleteList: false,
      })
      db.table('listUserDB')
        .delete(idListUser)
      deleteUser(idListUser)
    }

    forwardPagination = page => () => {
      const { users } = this.props
      if (page >= (users.length / 7) || page === 1) {
        this.setState({
          pageList: page - 1,
        })
      }
    }

    render() {
      const { users, createUser } = this.props
      const { pageList, deleteList } = this.state
      const visibleUserLength = users.length - (7 * pageList) >= 6 ? 6 : users.length - (7 * pageList)
      const visibleUser = []
      for (let i = 0; i < visibleUserLength; i += 1) {
        visibleUser.push(users[i + (7 * pageList)])
      }
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
              {users.length > 0 && visibleUser.map(user => (
                <tr key={user.idListUser} className={cx(deleteList === user.idListUser ? 'delete' : null)}>
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
                      {deleteList !== user.idListUser && (
                      <Fragment>
                        <button type='button' className={cx('button_editIcon')} onClick={this.editUser(user)}>
                          <EditIcon className={cx('editIcon')} />
                        </button>
                        <button type='button' className={cx('button_closeIcon')}>
                          <CloseIcon className={cx('closeIcon')} onClick={this.showRemoveUserButton(user.idListUser)} />
                        </button>
                      </Fragment>
                      )
                        }
                    </div>
                  </td>
                  {deleteList === user.idListUser && (
                  <label htmlFor='closeIcon' onClick={this.deleteUser(user.idListUser)}>
                    <button type='button' id='closeIcon'>
                      <CloseIcon className={cx('deleteUser')} />
                      delete
                    </button>
                  </label>
                  ) }
                </tr>
              ))}
            </tbody>
          </table>
          {users.length > 0 && (
          <div className={cx('ListUsers__Pagination')}>
            <button type='button'>&laquo;</button>
            <button
              type='button'
              className={cx('pagination__active')}
              onClick={this.forwardPagination(1)}
            >
              1
            </button>
            <button
              type='button'
              className={cx(users.length > 7 ? 'pagination__active' : '')}
              onClick={this.forwardPagination(2)}
            >
              2
            </button>
            <button
              type='button'
              className={cx(users.length > (7 * 2) ? 'pagination__active' : '')}
              onClick={this.forwardPagination(3)}
            >
              3
            </button>
            <button
              type='button'
              className={cx(users.length > (7 * 3) ? 'pagination__active' : '')}
              onClick={this.forwardPagination(4)}
            >
              4
            </button>
            <button
              type='button'
              className={cx(users.length > (7 * 4) ? 'pagination__active' : '')}
              onClick={this.forwardPagination(5)}
            >
              5
            </button>
            <button
              type='button'
              className={cx(users.length > (7 * 5) ? 'pagination__active' : '')}
              onClick={this.forwardPagination(6)}
            >
              6
            </button>
            <span className={cx(users.length > (7 * 6) ? 'pagination__active' : '')}>&raquo;</span>
          </div>
          )}
          {users.length === 0
                    && (
                    <Fragment>
                      <h2 className={cx('noUsersH2')}>
                        No users here :(
                      </h2>
                      <button type='button' className={cx('createUserButton')} onClick={createUser}>Create new user</button>
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
