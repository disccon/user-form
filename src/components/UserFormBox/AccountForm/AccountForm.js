import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import '../UserFormBox.scss'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import FieldInputAccount from '../../fieldForm/FieldInputAccount/FieldInputAccount'
import UserFormBox from '../UserFormBox'
import CropperModal from '../../CropperModalWindow/CropperModal'
import { validateAccount } from '../validateForm/validateAccount'

class Account extends Component {
  state = {
    typePasswordFirstInput: 'text',
    typePasswordSecondInput: 'text',
    avatarIMGError: null,
  }

  addImageUserAvatar = event => {
    event.preventDefault()
    const { setCropperSrc } = this.props
    const reader = new FileReader()
    const fileIMG = event.target.files[0]
    const fileSize = fileIMG.size / 1024 / 1024
    if (fileSize < 1) {
      reader.onloadend = () => {
        this.setState({
          avatarIMGError: false,
        })
        setCropperSrc(reader.result)()
      }
      reader.readAsDataURL(fileIMG)
    } else {
      this.setState({
        avatarIMGError: 'File should not exceed 1 mb',
      })
    }
  }

  onSubmitForm = values => {
    const { userAvatarIMGCropper, onSubmit } = this.props
    if (!userAvatarIMGCropper) {
      this.setState({
        avatarIMGError: 'Upload a picture',
      })
    } else {
      onSubmit(values)
    }
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

  render() {
    const {
      handleSubmit, labelButton,
      setCropperSrc, userAvatarIMGCropper, cropperSrc,
      changeAvatar, cropperButton, question,
    } = this.props
    const { typePasswordFirstInput, typePasswordSecondInput, avatarIMGError } = this.state

    const userAvatar = userAvatarIMGCropper
      ? <img className='userAvatarWrapper__userAvatarIMG' src={userAvatarIMGCropper} alt='userAvatar' />
      : <UserAvatarIcon className='userAvatarWrapper__userAvatarSVG' alt='userAvatar' />

    const userAvatarError = avatarIMGError
      ? <p className='userAvatarWrapper__avatarError'>{avatarIMGError}</p> : null

    return (
      <Fragment>
        {question}
        <UserFormBox handleSubmit={handleSubmit(this.onSubmitForm)} classForm='userFormBoxAccount'>
          <div className='userAvatarWrapper'>
            <label htmlFor='userAvatar'>
              {userAvatar}
              <input
                id='userAvatar'
                type='file'
                className='userAvatarWrapper__inputFile'
                accept='image/*,image/jpeg'
                onChange={this.addImageUserAvatar}
              />
            </label>
            <label htmlFor='userAvatarIMG' className='userAvatarWrapper__labelSpan'>
              <AddIcon className='userAvatarWrapper__AddICon' alt='addAvatar' />
              <span className='userAvatarWrapper__addAvatarSpan'>add avatar</span>
              <input
                id='userAvatarIMG'
                type='file'
                className='userAvatarWrapper__inputFile'
                accept='image/*,image/jpeg'
                onChange={this.addImageUserAvatar}
              />
            </label>
            {cropperButton}
            {userAvatarError}
          </div>
          <div className='register__userData'>
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
            <button className='accountComponent__buttonSubmit' type='submit'>{labelButton}</button>
          </div>
          {cropperSrc && (
            <CropperModal
              cropperSrc={cropperSrc}
              setCropperSrc={setCropperSrc}
              changeAvatar={changeAvatar}
            />
          )}
        </UserFormBox>
      </Fragment>
    )
  }
}

Account.propTypes = {
  userAvatarIMGCropper: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  cropperSrc: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
  ]),
  cropperButton: PropTypes.object,
  question: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  labelButton: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setCropperSrc: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
}

const AccountForm = reduxForm({
  validate: validateAccount,
  asyncValidate: (values, dispatch, props) => props.asyncValidateAccount(values, props.id),
  form: 'AccountForm',
  enableReinitialize: true,
  touchOnBlur: false,
})(Account)


export default AccountForm
