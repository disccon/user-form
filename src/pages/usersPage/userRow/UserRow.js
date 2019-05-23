import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import moment from 'moment/moment'
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
      <tr className={cx('userRow', { deleteUserClass })}>
        <td className={cx('userRow__fistTD')}>
          <img className={cx('userRow__img')} src={user.userSRCAvatarIMG} alt='userSRCAvatarIMG' />
          <div className={cx('userRow__wrapperDiv')}>
            <h4 className={cx('userRow__h4')}>
              {`${user.firstName} ${user.lastName}`}
            </h4>
            <span className={cx('userRow__span')}>{user.userName}</span>
          </div>
        </td>
        <td className={cx('userRow__td')}>
          <div className={cx('userRow__div')}>{user.company}</div>
        </td>
        <td className={cx('userRow__td')}>
          <div className={cx('userRow__div')}>{user.email}</div>
        </td>
        <td className={cx('userRow__td')}>
          <div className={cx('userRow__div')}>
            <span className={cx('userRow__lastUpdate')}>
              {moment(moment(user.lastUpdate).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').fromNow()}
            </span>
            {!deleteUserClass && (
              <Fragment>
                <Link to={`/user/${user.id}`}>
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
            )}
          </div>
          {deleteUserClass && (
            <button type='button' className={cx('userRow__buttonDeleteUser')} onClick={deleteUser(user.id)}>
              <div className={cx('userRow__deleteUserWrapper')}>
                <CloseIcon className={cx('deleteUser')} />
                delete
              </div>
            </button>
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
