import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import styles from '../../../components/UserFormBox/UserFormBox.scss'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { saveEditUserData, changeAvatarAccountEditing, fetchEditUser } from '../../../actions/actionEditUser'
import FieldInputAccount from '../../../components/fieldForm/FieldInputAccount/FieldInputAccount'
import UserFormBox from '../../../components/UserFormBox/UserFormBox'
import CropperModal from '../../../components/CropperModalWindow/CropperModal'
import db from '../../../db'

const cx = classNames.bind(styles)

class AccountEditing extends Component {
  state = {
    avatarIMGError: null,
    typePasswordFirstInput: 'text',
    typePasswordSecondInput: 'text',
    cropperSrc: null,
  }

  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  addImageUserAvatar = event => {
    event.preventDefault()
    const reader = new FileReader()
    const fileIMG = event.target.files[0]
    const fileSize = fileIMG.size / 1024 / 1024
    if (fileSize < 1) {
      reader.onloadend = () => {
        this.setState({
          avatarIMGError: false,
          cropperSrc: reader.result,
        })
      }
      reader.readAsDataURL(fileIMG)
    } else {
      this.setState({
        avatarIMGError: 'File should not exceed 1 mb',
      })
    }
  }

  onSubmit = values => {
    const {
      saveEditUserData, id, userAvatarIMGCropper, userAvatarIMG,
    } = this.props
    saveEditUserData(id, {
      userName: values.userName,
      password: values.password,
      repeatPassword: values.repeatPassword,
      userAvatarIMGCropper,
      userAvatarIMG,
    })
  }

  changeTypePassword = nameTypePassword => () => {
    const { [nameTypePassword]: typePassword } = this.state
    if (typePassword === 'text') {
      this.setState({
        [nameTypePassword]: 'password',
      })
    } else {
      this.setState({
        [nameTypePassword]: 'text',
      })
    }
  }

  setCropperSrc = isCropperSrc => () => {
    this.setState({
      cropperSrc: isCropperSrc,
    })
  }

  cropperAvatar = () => {
    const { userAvatarIMG } = this.props
    this.setState({
      cropperSrc: userAvatarIMG,
    })
  }


  render() {
    const { handleSubmit, userAvatarIMGCropper, changeAvatarAccountEditing } = this.props
    const {
      avatarIMGError, typePasswordFirstInput, typePasswordSecondInput, cropperSrc,
    } = this.state
    const userAvatar = userAvatarIMGCropper
      ? <img className={cx('userAvatarWrapper__userAvatarIMG')} src={userAvatarIMGCropper} alt='userAvatar' />
      : <UserAvatarIcon className={cx('userAvatarWrapper__userAvatarSVG')} alt='userAvatar' />
    const userAvatarError = avatarIMGError
      ? <p className={cx('userAvatarWrapper__avatarError')}>{avatarIMGError}</p> : null
    return (
      <UserFormBox handleSubmit={handleSubmit(this.onSubmit)} classForm='userFormBoxAccount'>
        <div className={cx('userAvatarWrapper')}>
          <label htmlFor='userAvatar'>
            {userAvatar}
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
          <button className={cx('userAvatarWrapper__buttonCrop')} type='button' onClick={this.cropperAvatar}>
            Crop Avatar
          </button>

          {userAvatarError}
        </div>
        <div className={cx('register__userData')}>
          <Field
            component={FieldInputAccount}
            type='text'
            label='User name'
            name='userName'
            idInput='userName'
          />
          <Field
            component={FieldInputAccount}
            type={typePasswordFirstInput}
            isVisibility
            label='Password'
            name='password'
            idInput='password'
            changeTypePassword={this.changeTypePassword('typePasswordFirstInput')}
          />
          <Field
            component={FieldInputAccount}
            type={typePasswordSecondInput}
            isVisibility
            label='Repeat Password'
            name='repeatPassword'
            idInput='repeatPassword'
            changeTypePassword={this.changeTypePassword('typePasswordSecondInput')}
          />
          <button className={cx('accountComponent__buttonSubmit')} type='submit'>Save</button>
        </div>
        {cropperSrc && (
          <CropperModal
            cropperSrc={cropperSrc}
            setCropperSrc={this.setCropperSrc}
            changeAvatar={changeAvatarAccountEditing}
          />
        )}
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
    return db.usersDB.toArray(usersDB => {
      const userFilterName = usersDB.filter(user => user.id !== id)
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
  userAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  userAvatarIMGCropper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  saveEditUserData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  changeAvatarAccountEditing: PropTypes.func.isRequired,
  fetchEditUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    userName, password, repeatPassword, userAvatarIMGCropper, userAvatarIMG,
  } = state.editUserReducer.editUser
  return {
    initialValues: {
      userName, password, repeatPassword,
    },
    userAvatarIMGCropper,
    userAvatarIMG,
    id,
  }
}

export default connect(
  mapStateToProps,
  {
    saveEditUserData, changeAvatarAccountEditing, fetchEditUser,
  },
)(AccountEditingForm)
