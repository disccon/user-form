import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import styles from '../../userFormBox/UserFormBox.scss'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import {
  forwardAccount, saveUserSRCAvatarIMG, continueUser, changeQuestionState,
} from '../../../actions'
import { fieldInputAccount } from '../../fieldForm/fieldInputAccount/FieldInputAccount'
import { UserFormBox } from '../../userFormBox/UserFormBox'
import { QuestionAccount } from './questionAccount/QuestionAccount'
import db from '../../../db'

const cx = classNames.bind(styles)

class Account extends Component {
  state = {
    avatarIMGError: null,
    typeFieldPassword: 'text',
  }

  continueUser = isContinue => () => {
    const { continueUser } = this.props
    continueUser(isContinue)
  }

  addImageUserAvatar = event => {
    event.preventDefault()
    const { saveUserSRCAvatarIMG } = this.props
    const reader = new FileReader()
    const fileIMG = event.target.files[0]
    const fileSize = fileIMG.size / 1024 / 1024
    if (fileSize < 1) {
      reader.onloadend = () => {
        this.setState({
          avatarIMGError: false,
        })
        saveUserSRCAvatarIMG(reader.result)
      }
      reader.readAsDataURL(fileIMG)
    } else {
      this.setState({
        avatarIMGError: 'File should not exceed 1 mb',
      })
    }
  }

  onSubmit = values => {
    const { forwardAccount, userSRCAvatarIMG } = this.props
    if (!userSRCAvatarIMG) {
      this.setState({
        avatarIMGError: 'Upload a picture',
      })
    } else {
      forwardAccount(values.userName, values.password, values.repeatPassword)
    }
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
    const { handleSubmit, userSRCAvatarIMG, isQuestion } = this.props
    const { avatarIMGError, typeFieldPassword } = this.state
    const userAvatarIMG = userSRCAvatarIMG
      ? <img className={cx('userAvatarWrapper__userAvatarIMG')} src={userSRCAvatarIMG} alt='userAvatar' />
      : <UserAvatarIcon className={cx('userAvatarWrapper__userAvatarSVG')} alt='userAvatar' />
    const UserAvatar = avatarIMGError
      ? <p className={cx('userAvatarWrapper__avatarError')}>{avatarIMGError}</p> : null
    return (
      <Fragment>
        {isQuestion && <QuestionAccount continueUser={this.continueUser} />}
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
              component={fieldInputAccount}
              type='text'
              label='User name'
              name='userName'
              idInput='userName'
            />
            <Field
              component={fieldInputAccount}
              type={typeFieldPassword}
              isVisibility
              label='Password'
              name='password'
              idInput='password'
              changeTypePassword={this.changeTypePassword}
            />
            <Field
              component={fieldInputAccount}
              type={typeFieldPassword}
              isVisibility
              label='Repeat Password'
              name='repeatPassword'
              idInput='repeatPassword'
              changeTypePassword={this.changeTypePassword}
            />
            <button className={cx('accountComponent__buttonSubmit')} type='submit'>Forward</button>
          </div>
        </UserFormBox>
      </Fragment>
    )
  }
}


const accountForm = reduxForm({
  asyncValidate: values => db.usersDB.toArray(usersDB => {
    const userNameList = usersDB.map(user => user.userName)
    let errorUserName
    userNameList.find(userEmail => (
      errorUserName = values.userName === userEmail ? 'already have this email in the database' : null))
    if (errorUserName) {
      return Promise.reject({
        userName: errorUserName,
      })
    }
  }),

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
  form: 'Account',
  enableReinitialize: true,
})(Account)

Account.propTypes = {
  userSRCAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  isQuestion: PropTypes.bool.isRequired,
  continueUser: PropTypes.func.isRequired,
  saveUserSRCAvatarIMG: PropTypes.func.isRequired,
  forwardAccount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  newUser: PropTypes.object.isRequired,
  changeQuestionState: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    userName, password, repeatPassword, userSRCAvatarIMG, isQuestion,
  } = state.newUser
  return {
    initialValues: {
      userName, password, repeatPassword,
    },
    userSRCAvatarIMG,
    isQuestion,
    newUser: state.newUser,
  }
}

export default connect(
  mapStateToProps,
  {
    forwardAccount, saveUserSRCAvatarIMG, continueUser, changeQuestionState,
  },
)(accountForm)
