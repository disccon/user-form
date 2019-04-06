import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Account.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/close.svg'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as VisibilityIcon } from '../../../img/icon/visibility.svg'
import { ReactComponent as VisibilityOffIcon } from '../../../img/icon/visibilityOff.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { forwardAccount, saveUserSRCAvatarIMG } from '../../../Actions'
import { reduxForm, Field } from 'redux-form';

const cx = classNames.bind(styles)


export const renderFieldInput = ({ label, input, type, meta: { touched, error }, isVisibility, changeTypePassword}) => {
  const visibilityIcon = type === 'text' ? <VisibilityIcon className={cx('accountComponent__visibilityIcon')} onClick={changeTypePassword}/> :
    <VisibilityOffIcon className={cx('accountComponent__visibilityIcon')} onClick={changeTypePassword}/>
  return (<label>
      <h4>{label}</h4>
      {isVisibility && visibilityIcon}
      <div>
        <input {...input} type={type}/>
        {touched && error && <p>{error}</p>}
      </div>
    </label>
  )
}


class Account extends Component {
  state = {
    file: '',
    avatarIMGError: null,
    typeFieldPassword: 'text'
  }
  addImageUserAvatar = event => {
    event.preventDefault();
    const { saveUserSRCAvatarIMG } = this.props
    let reader = new FileReader()
    let file = event.target.files[0]
    const fileSize = file.size / 1024 / 1024
    if (fileSize < 1) {
      reader.onloadend = () => {
        this.setState({
          file: file,
          avatarIMGError: false,
        })
        saveUserSRCAvatarIMG(reader.result)
      }
      reader.readAsDataURL(file)
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
    if(typeFieldPassword === 'text'){
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
    const userAvatarIMG = userSRCAvatarIMG ?
      <img className={cx('accountComponent__userAvatarIMG')} src={userSRCAvatarIMG}/> :
      <UserAvatarIcon className={cx('accountComponent__userAvatarSVG')} alt='userAvatar'/>
    const UserAvatar = avatarIMGError ? <p className={cx('accountComponent__avatarError')}>{avatarIMGError}</p> : null
    return (
      <Fragment>
        <div className={cx('accountComponent__question')}>
          <span>You have an unsaved user data. Do you want to complete it?</span>
          <button className={cx('accountComponent__continue')}>Continue</button>
          <button className={cx('accountComponent__close')}>
            <CloseIcon className={cx('accountComponent__closeIcon')} alt='closeIcon'/></button>
        </div>
        <form className={cx('accountComponent__form')} onSubmit={handleSubmit(this.onSubmit)}>
          <div className={cx('accountComponent__userAvatarWrapper')}>
            <label>
              {userAvatarIMG}
              <input type="file" className={cx('accountComponent__inputFile')} accept="image/*,image/jpeg"
                     onChange={this.addImageUserAvatar}/>
            </label>
            <label className={cx('accountComponent__labelSpan')}>
              <AddIcon className={cx('accountComponent__AddICon')} alt="addAvatar"/>
              <span className={cx('accountComponent__addAvatarSpan')}>add avatar</span>
              <input type="file" className={cx('accountComponent__inputFile')} accept="image/*,image/jpeg"
                     onChange={this.addImageUserAvatar} />
            </label>
            {UserAvatar}
          </div>
          <div className={cx('register__userData')}>
            <Field component={renderFieldInput} type="text"
                   label='User name' name="userName"/>
            <Field component={renderFieldInput} type={typeFieldPassword} isVisibility={true}
                   label='Password' name="password" changeTypePassword={this.changeTypePassword}/>
            <Field component={renderFieldInput} type={typeFieldPassword} isVisibility={true}
                   label='Repeat Password' name="repeatPassword" changeTypePassword={this.changeTypePassword}/>
            <button type="submit">Forward</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

// Account.propTypes = {
//   initialValues: PropTypes.shape({
//     userName: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     repeatPassword: PropTypes.string.isRequired,
//   })
// }


Account = reduxForm({
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
    if (values.password !== values.repeatPassword)
      errors.repeatPassword = "Passwords doesn't match";

    return errors;
  },
  form: 'Account',
})(Account)

// const selector = formValueSelector('Account')
// const haspassword = selector(state, 'password')


const mapStateToProps = state => {

  const { userName, password, repeatPassword, userSRCAvatarIMG } = state.newUser
  return {
    initialValues: {
      userName, password, repeatPassword,
    },
    userSRCAvatarIMG,
  }
}

export default Account = connect(
  mapStateToProps,
  { forwardAccount, saveUserSRCAvatarIMG }
)(Account)






