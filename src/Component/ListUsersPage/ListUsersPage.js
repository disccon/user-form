import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './ListUsersPage.scss'

import { ReactComponent as CloseIcon } from '../../img/icon/close.svg'
import { ReactComponent as EditIcon } from '../../img/icon/edit.svg'
import {editUser} from '../../Actions'

const cx = classNames.bind(styles)


class ListUsersPage extends Component {
  editUser = user => () => {
    const { editUser } = this.props
    editUser(user)
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
          <tr></tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className={cx('wrapperUser')}>
                  <img src={user.userSRCAvatarIMG}/>
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
                <div className={cx('wrapperUser')}>3 month ago
                  <button className={cx('button_editIcon')} onClick={this.editUser(user)}>
                    <EditIcon className={cx('editIcon')}/>
                  </button>
                  <button className={cx('button_closeIcon')}>
                    <CloseIcon className={cx('closeIcon')}/>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {}

const mapStateToProps = state => ({
  users: state.listUsers.users,
})

export default connect(
  mapStateToProps,
    {editUser}
)(ListUsersPage)