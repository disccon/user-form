import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import styles from '../../UserFormBox/UserFormBox.scss'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { accountEditingSave, saveAvatarAccountEditing, userEditState } from '../../../Actions'
import { renderFieldInputAccount } from '../../renderFieldForm/renderFieldInputAccount/renderFieldInputAccount'
import { UserFormBox } from '../../UserFormBox/UserFormBox'
import db from '../../../db'
import { userGetIndexDB } from '../../../helpers/userGetIndexDB'

const cx = classNames.bind(styles)

class AccountEditing extends Component {
  state = {
    avatarIMGError: null,
    typeFieldPassword: 'text',
  }

  componentDidMount() {
    const { userEditState } = this.props
    const { id } = this.props
    userGetIndexDB(userEditState, id)
  }

  addImageUserAvatar = event => {
    event.preventDefault()
    const { saveAvatarAccountEditing, id } = this.props
    const reader = new FileReader()
    const fileIMG = event.target.files[0]
    const fileSize = fileIMG.size / 1024 / 1024
    if (fileSize < 1) {
      reader.onloadend = () => {
        this.setState({
          avatarIMGError: false,
        })
        saveAvatarAccountEditing(reader.result, id)
      }
      reader.readAsDataURL(fileIMG)
    } else {
      this.setState({
        avatarIMGError: 'File should not exceed 1 mb',
      })
    }
  }

  onSubmit = values => {
    const { accountEditingSave, id, userSRCAvatarIMG } = this.props
    accountEditingSave(values.userName, values.password, values.repeatPassword, userSRCAvatarIMG, id)
  }

  changeTypePassword = () => {
    const { typeFieldPassword } = this.state
    if (typeFieldPassword === 'text') {
      this.setState({
        typeFieldPassword: 'password',
      })
    } else {
      this.setState({
        typeFieldPassword: 'text',
      })
    }
  }

  render() {
    const { handleSubmit, userSRCAvatarIMG } = this.props
    const { avatarIMGError, typeFieldPassword } = this.state
    const userAvatarIMG = userSRCAvatarIMG
      ? <img className={cx('userAvatarWrapper__userAvatarIMG')} src={userSRCAvatarIMG} alt='userAvatar' />
      : <UserAvatarIcon className={cx('userAvatarWrapper__userAvatarSVG')} alt='userAvatar' />
    const UserAvatar = avatarIMGError
      ? <p className={cx('userAvatarWrapper__avatarError')}>{avatarIMGError}</p> : null
    return (
      <UserFormBox handleSubmit={handleSubmit(this.onSubmit)} classForm='userFormBoxAccount'>
        <div className={cx('userAvatarWrapper')}>
          <label htmlFor='userAvatar'>
            {userAvatarIMG}
            <input
              id='userAvatar'
              type='file'
              className={cx('userAvatarWrapper__inputFile')}
              accept='image/*,image/jpeg'
              onChange={this.addImageUserAvatar}
            />
          </label>
          <label htmlFor='userAvatarIMG' className={cx('userAvatarWrapper__labelSpan')}>
            <AddIcon className={cx('userAvatarWrapper__AddICon')} alt='addAvatar' />
            <span className={cx('userAvatarWrapper__addAvatarSpan')}>add avatar</span>
            <input
              id='userAvatarIMG'
              type='file'
              className={cx('userAvatarWrapper__inputFile')}
              accept='image/*,image/jpeg'
              onChange={this.addImageUserAvatar}
            />
          </label>
          {UserAvatar}
        </div>
        <div className={cx('register__userData')}>
          <Field
            component={renderFieldInputAccount}
            type='text'
            label='User name'
            name='userName'
            idInput='userName'
          />
          <Field
            component={renderFieldInputAccount}
            type={typeFieldPassword}
            isVisibility
            label='Password'
            name='password'
            idInput='password'
            changeTypePassword={this.changeTypePassword}
          />
          <Field
            component={renderFieldInputAccount}
            type={typeFieldPassword}
            isVisibility
            label='Repeat Password'
            name='repeatPassword'
            idInput='repeatPassword'
            changeTypePassword={this.changeTypePassword}
          />
          <button className={cx('accountComponent__buttonSubmit')} type='submit'>Save</button>
        </div>
      </UserFormBox>
    )
  }
}

const AccountEditingForm = reduxForm({
  validate: values => {
    const errors = {}
    if (!values.userName) {
      errors.userName = 'Missing User Name'
    } else if (values.userName.length <= 3) {
      errors.userName = 'Must be 4 characters or more'
    }

    if (!values.password) {
      errors.password = 'Missing Password'
    } else if (values.password.length <= 3) {
      errors.password = 'Must be 4 characters or more'
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = 'Missing Repeat Password'
    }
    if (values.password !== values.repeatPassword) errors.repeatPassword = "Passwords doesn't match"

    return errors
  },
  asyncValidate: (values, dispatch, props) => {
    const { id } = props
    return db.listUserDB.toArray(listUserDB => {
      const userFilterName = listUserDB.filter(user => user.id !== id)
      const userNameList = userFilterName.map(user => user.userName)
      let errorUserName
      userNameList.find(userEmail => (
        errorUserName = values.userName === userEmail ? 'already have this email in the database' : null))
      if (errorUserName) {
        return Promise.reject({
          userName: errorUserName,
        })
      }
    })
  },
  form: 'AccountEditing',
  enableReinitialize: true,
})(AccountEditing)

AccountEditing.propTypes = {
  id: PropTypes.number,
  userSRCAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  accountEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  saveAvatarAccountEditing: PropTypes.func.isRequired,
  userEditState: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    userName, password, repeatPassword, userSRCAvatarIMG,
  } = state.editUserState.editUser
  return {
    initialValues: {
      userName, password, repeatPassword,
    },
    userSRCAvatarIMG,
    id,
  }
}

export default connect(
  mapStateToProps,
  {
    accountEditingSave, saveAvatarAccountEditing, userEditState,
  },
)(AccountEditingForm)
