import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from '../ListUsersPage.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/close.svg'
import { ReactComponent as EditIcon } from '../../../img/icon/edit.svg'
import { editUser, deleteUser } from '../../../Actions'
import db from '../../../db'

const cx = classNames.bind(styles)

class UserRow extends Component {
  state = {
    deleteList: false,
  }

  showRemoveUserButton = id => () => {
    this.setState({
      deleteList: id,
    })
  }

  editUser = user => () => {
    const { history } = this.props
    history.push(`/EditUser/${user.id}`)
  }

  deleteUser = idListUser => () => {
    const {
      deleteUser, changeActivePage, activePage, users,
    } = this.props
    this.setState({
      deleteList: false,
    })
    if (users.length === 1) {
      changeActivePage(activePage - 1)
    }
    db.table('listUserDB')
      .delete(idListUser)
    deleteUser(idListUser)
  }

  render() {
    const { users } = this.props
    const { deleteList } = this.state
    return (
      <Fragment>
        {users.map(user => (
          <tr key={user.id} className={cx(deleteList === user.id ? 'delete' : null)}>
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
                {deleteList !== user.id && (
                <Fragment>
                  <button type='button' className={cx('button_editIcon')} onClick={this.editUser(user)}>
                    <EditIcon className={cx('editIcon')} />
                  </button>
                  <button type='button' className={cx('button_closeIcon')}>
                    <CloseIcon
                      className={cx('closeIcon')}
                      onClick={this.showRemoveUserButton(user.id)}
                    />
                  </button>
                </Fragment>
                )
                  }
              </div>
              {deleteList === user.id && (
              <label onClick={this.deleteUser(user.id)}>
                <button type='button' id='closeIcon'>
                  <CloseIcon className={cx('deleteUser')} />
                      delete
                </button>
              </label>
              )}
            </td>
          </tr>
        ))}
      </Fragment>
    )
  }
}


UserRow.propTypes = {
  history: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  activePage: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
}


export default connect(
  null,
  { editUser, deleteUser },
)(UserRow)
