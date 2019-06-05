import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash/core'
import { push } from 'connected-react-router'
import AccountForm from '../../../components/UserFormBox/AccountForm/AccountForm'
import { changeAvatarAccount, continueUser, saveNewUserData } from '../../../actions/actionNewUser'
import { asyncValidateCreateAccount } from '../../../components/UserFormBox/validateForm/asyncValidateCreateAccount'
import QuestionAccount from './QuestionAccount/QuestionAccount'

class CreateUserAccount extends Component {
  state = {
    cropperSrc: null,
  }

  continueUser = isContinue => () => {
    const { continueUser } = this.props
    continueUser(isContinue)
  }

  onSubmit = values => {
    const {
      saveNewUserData, push,
    } = this.props
    saveNewUserData({
      ...values,
      accountFilled: true,
      isQuestion: false,
    })
    push('/profile')
  }

  setCropperSrc = isCropperSrc => () => {
    this.setState({
      cropperSrc: isCropperSrc,
    })
  }

  render() {
    const { cropperSrc } = this.state
    const {
      isQuestion, userAvatarIMGCropper, changeAvatarAccount,
    } = this.props
    const question = isQuestion && <QuestionAccount continueUser={this.continueUser} />
    return (
      <AccountForm
        labelButton='Forward'
        onSubmit={this.onSubmit}
        initialValues={_.pick(this.props, ['userName', 'password', 'repeatPassword'])}
        userAvatarIMGCropper={userAvatarIMGCropper}
        changeAvatar={changeAvatarAccount}
        asyncValidateAccount={asyncValidateCreateAccount}
        setCropperSrc={this.setCropperSrc}
        cropperSrc={cropperSrc}
        question={question}
      />
    )
  }
}

CreateUserAccount.propTypes = {
  userAvatarIMGCropper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  isQuestion: PropTypes.bool.isRequired,
  continueUser: PropTypes.func.isRequired,
  changeAvatarAccount: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  saveNewUserData: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    userName, password, repeatPassword, userAvatarIMGCropper, isQuestion,
  } = state.newUser
  return {
    userName,
    password,
    repeatPassword,
    userAvatarIMGCropper,
    isQuestion,
  }
}

export default connect(
  mapStateToProps,
  {
    push, saveNewUserData, continueUser, changeAvatarAccount,
  },
)(CreateUserAccount)
