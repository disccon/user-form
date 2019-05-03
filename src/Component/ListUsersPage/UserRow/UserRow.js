import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './UserRow.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/close.svg'
import { ReactComponent as EditIcon } from '../../../img/icon/edit.svg'

const cx = classNames.bind(styles)

export const UserRow = ({
  user, activeDeleteRow, showRemoveUserButton, deleteUser,
}) => (
  <Fragment>
    <tr className={cx('listUsers__trName', { deleteUserRow: user.id === activeDeleteRow })}>
      <td className={cx('userRow')}>
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
          {activeDeleteRow !== user.id && (
            <Fragment>
              <Link to={`/EditUser/${user.id}`}>
                <button type='button' className={cx('userRow__buttonEdit')}>
                  <EditIcon className={cx('userRow__editIcon')} />
                </button>
              </Link>
              <button type='button' className={cx('userRow__buttonClose')}>
                <CloseIcon
                  className={cx('userRow__closeIcon')}
                  onClick={showRemoveUserButton(user.id)}
                />
              </button>
            </Fragment>
          )
          }
        </div>
        {activeDeleteRow === user.id && (
          <div className={cx('userRow__deleteUserWrapper')} onClick={deleteUser(user.id)}>
            <button type='button' className={cx('userRow__buttonDeleteUser')}>
              <CloseIcon className={cx('deleteUser')} />
              delete
            </button>
          </div>
        )}
      </td>
    </tr>
  </Fragment>
)

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  activeDeleteRow: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  deleteUser: PropTypes.func.isRequired,
  showRemoveUserButton: PropTypes.func.isRequired,
}
