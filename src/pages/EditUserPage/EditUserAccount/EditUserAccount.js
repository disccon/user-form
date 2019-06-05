import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import AccountForm from '../../../components/UserFormBox/AccountForm/AccountForm'
import { changeAvatarAccountEdit, fetchEditUser, saveEditUserData } from '../../../actions/actionEditUser'
import styles from '../../../components/UserFormBox/UserFormBox.scss'
import { asyncValidateEditAccount } from '../../../components/UserFormBox/validateForm/asyncValidateEditAccount'

const cx = classNames.bind(styles)

class EditUserAccount extends Component {
  state = {
    cropperSrc: null,
  }

  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  onSubmit = values => {
    const {
      id, userAvatarIMGCropper, userAvatarIMG, push, saveEditUserData,
    } = this.props
    saveEditUserData({
      ...values,
      userAvatarIMGCropper,
      userAvatarIMG,
    }, id)
    push(`/user/${id}`)
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
    const { userAvatarIMGCropper, changeAvatarAccountEdit, id } = this.props
    const { cropperSrc } = this.state
    const cropperButton = (
      <button className={cx('userAvatarWrapper__buttonCrop')} type='button' onClick={this.cropperAvatar}>
        Crop Avatar
      </button>
    )
    return (
      <AccountForm
        labelButton='Save'
        onSubmit={this.onSubmit}
        initialValues={_.pick(this.props, ['userName', 'password', 'repeatPassword'])}
        userAvatarIMGCropper={userAvatarIMGCropper}
        changeAvatar={changeAvatarAccountEdit}
        asyncValidateAccount={asyncValidateEditAccount}
        id={id}
        setCropperSrc={this.setCropperSrc}
        cropperSrc={cropperSrc}
        cropperButton={cropperButton}
      />
    )
  }
}

EditUserAccount.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  userAvatarIMGCropper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  userAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  fetchEditUser: PropTypes.func.isRequired,
  saveEditUserData: PropTypes.func.isRequired,
  changeAvatarAccountEdit: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    userName, password, repeatPassword, userAvatarIMGCropper, userAvatarIMG,
  } = state.editUserReducer.editUser
  return {
    userName,
    password,
    repeatPassword,
    userAvatarIMGCropper,
    userAvatarIMG,
    id,
  }
}

export default connect(
  mapStateToProps,
  {
    push, saveEditUserData, changeAvatarAccountEdit, fetchEditUser,
  },
)(EditUserAccount)
