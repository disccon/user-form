import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import onClickOutside from 'react-onclickoutside'
import moment from 'moment/moment'
import './UserRow.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/close.svg'
import { ReactComponent as EditIcon } from '../../../img/icon/edit.svg'

class UserRow extends Component {
  state = {
    deleteUserClass: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        deleteUserClass: false,
      })
    }
  }

  handleClickOutside = () => {
    this.setState({
      deleteUserClass: false,
    })
  }

  showDeleteButton = () => {
    this.setState({
      deleteUserClass: true,
    })
  }

  render() {
    const { user, deleteUser, oldIndex } = this.props
    const { deleteUserClass } = this.state
    return (
      <tr className={cn('userRow', { deleteUserClass }, { oldIndex })}>
        <td className='userRow__fistTD'>
          <div className='userRow__fistTDWrapper'>
            <img className='userRow__img' src={user.userAvatarIMGCropper} alt='userAvatarIMG' />
            <div className='userRow__wrapperDiv'>
              <h4 className='userRow__h4'>
                {`${user.firstName} ${user.lastName}`}
              </h4>
              <span className='userRow__span'>{user.userName}</span>
            </div>
          </div>
        </td>
        <td className='userRow__td userRow__company'>
          <div className='userRow__div'>{user.company}</div>
        </td>
        <td className='userRow__td userRow__contacts'>
          <div className='userRow__div'>{user.email}</div>
        </td>
        <td className='userRow__td userRow__update'>
          <div className='userRow__div'>
            <span className='userRow__lastUpdate'>
              {moment(moment(user.lastUpdate).format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').fromNow()}
            </span>
            {!deleteUserClass && (
              <Fragment>
                <Link to={`/user/${user.id}`}>
                  <button type='button' className='userRow__buttonEdit'>
                    <EditIcon className='userRow__editIcon' />
                  </button>
                </Link>
                <button type='button' className='userRow__buttonClose'>
                  <CloseIcon
                    className='userRow__closeIcon'
                    onClick={this.showDeleteButton}
                  />
                </button>
              </Fragment>
            )}
          </div>
          {deleteUserClass && (
            <button type='button' className='userRow__buttonDeleteUser' onClick={deleteUser(user.id)}>
              <div className='userRow__deleteUserWrapper'>
                <CloseIcon className='deleteUser' />
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
  oldIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

export default onClickOutside(UserRow)
