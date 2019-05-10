import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import styles from './UserRow.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/close.svg'
import { ReactComponent as EditIcon } from '../../../img/icon/edit.svg'

const cx = classNames.bind(styles)

class UserRow extends Component {
  state = {
    deleteUserClass: false,
  }

  handleClickOutside = () => {
    const { deleteUserClass } = this.state
    if (deleteUserClass) {
      this.setState({
        deleteUserClass: false,
      })
    }
  }

  showDeleteButton = () => {
    this.setState({
      deleteUserClass: true,
    })
  }

  render() {
    const { user, deleteUser } = this.props
    const { deleteUserClass } = this.state
    return (
      <tr className={cx('listUsers__trName', { deleteUserClass })}>
        <td className={cx('userRow userRow_fistTD')}>
          <img className={cx('userRow__img')} src={user.userSRCAvatarIMG} alt='userSRCAvatarIMG' />
          <div className={cx('userRow__wrapperDiv')}>
            <h4 className={cx('userRow__h4')}>{user.userName}</h4>
            <span className={cx('userRow__span')}>username</span>
          </div>
        </td>
        <td className={cx('listUsers__trCompany')}>
          <div className={cx('userRow')}>{user.company}</div>
        </td>
        <td>
          <div className={cx('userRow')}>{user.email}</div>
        </td>
        <td>
          <div className={cx('userRow')}>
            3 month ago
            {!deleteUserClass && (
              <Fragment>
                <Link to={`/EditUser/${user.id}`}>
                  <button type='button' className={cx('userRow__buttonEdit')}>
                    <EditIcon className={cx('userRow__editIcon')} />
                  </button>
                </Link>
                <button type='button' className={cx('userRow__buttonClose')}>
                  <CloseIcon
                    className={cx('userRow__closeIcon')}
                    onClick={this.showDeleteButton}
                  />
                </button>
              </Fragment>
            )
            }
          </div>
          {deleteUserClass && (
            <div className={cx('userRow__deleteUserWrapper')} onClick={deleteUser(user.id)}>
              <button type='button' className={cx('userRow__buttonDeleteUser')}>
                <CloseIcon className={cx('deleteUser')} />
                delete
              </button>
            </div>
          )}
        </td>
      </tr>
    )
  }
}

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}
export default onClickOutside(UserRow)
