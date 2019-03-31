import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Account.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/closeIcon.svg'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { forwardAccount } from '../../../Actions'

import { reduxForm, Field, formValueSelector } from 'redux-form';




const cx = classNames.bind(styles)

//   <Field component={renderFieldP} type='file'
// name='errorPP'/>
// const renderFieldP = ({ input, type, meta: { touched, error } }) => (
//   <Fragment>
//     <label>
//       {userAvatarIMG}
//       <input {...input} type={type} className={cx('accountComponent__inputFile')} accept="image/*,image/jpeg"
//              onChange={this.addImageUserAvatar}/>
//     </label>
//     <label className={cx('accountComponent__labelSpan')}>
//       <AddIcon className={cx('accountComponent__AddICon')} alt="addAvatar"/>
//       <span className={cx('accountComponent__addAvatarSpan')}>add avatar</span>
//       <input {...input} type={type} className={cx('accountComponent__inputFile')} accept="image/*,image/jpeg"
//              onChange={this.addImageUserAvatar}/>
//       {touched && error && <p>{error}</p> }
//     </label>
//   </Fragment>
// )




export const renderFieldInput = ({ label, input, type, meta: { touched, error } }) => (
  <label>
      <h4>{label}</h4>
      <div>
        <input {...input} type={type}/>
        {touched && error && <p className={cx('register__error')}>{error}</p>}
      </div>
    </label>
  )





class Account extends Component {
  state = {
    file: '',
    userAvatarIMGUrl: '',
    isUserAvatar: false,
  }
  addImageUserAvatar = event => {
    event.preventDefault();
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: file,
        userAvatarIMGUrl: reader.result,
        isUserAvatar: false,
      })
    }
    reader.readAsDataURL(file)
  }

  onSubmit = values => {
    const { userAvatarIMGUrl } = this.state;
    const { forwardAccount } = this.props;
    if(!userAvatarIMGUrl) {
      this.setState({
        isUserAvatar: true,
      })
    } else {
      forwardAccount(values.userName,values.password, values.repeatPassword, userAvatarIMGUrl)
    }

  }
  render() {
    const { handleSubmit } = this.props
    const { userAvatarIMGUrl, isUserAvatar } = this.state
    const userAvatarIMG = userAvatarIMGUrl ?
      <img className={cx('accountComponent__userAvatarIMG')} src={userAvatarIMGUrl}/> :
      <UserAvatarIcon className={cx('accountComponent__userAvatarSVG')} alt='userAvatar'/>
    const UserAvatar = isUserAvatar ? <p className={cx('accountComponent__avatarError')}>Upload a picture</p> : null
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
                     onChange={this.addImageUserAvatar}/>
            </label>
            {UserAvatar}
          </div>
          <div className={cx('register__userData')}>
            <Field component={renderFieldInput} type="text"
                   label='User name' name="userName"/>
            <Field component={renderFieldInput} type="text"
                   label='Password' name="password"/>
            <Field component={renderFieldInput} type="text"
                   label='Repeat Password' name="repeatPassword"/>
            <button type="submit">Forward</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

Account.propTypes = {
  initialValues: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    repeatPassword: PropTypes.string.isRequired,
  }),
}

const validate = values => {
  const errors = {}
  if (!values.errorPP) {
    errors.errorPP = 'Upload a picture'
  }
  if (!values.userName) {
    errors.userName = 'Missing User Name'
  }
  if (!values.userName) {
    errors.userName = 'Missing User Name'
  }
  if (!values.password) {
    errors.password = 'Missing Password'
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = 'Missing Repeat Password'
  }
  if (values.password !== values.repeatPassword)
    errors.repeatPassword = "Passwords doesn't match";
  if (values.userName) {
    if (values.userName.length < 4) {
      errors.userName = 'Username must be more than 4 letters'
    }
  }
  if (values.password) {
    if (values.password.length < 4) {
      errors.password = 'Password must be more than 4 letters'
    }
  }
  return errors;
}

Account = reduxForm({
  validate,
  form: 'Account',
})(Account)

//const selector = formValueSelector('Account')
//const haspassword = selector(state, 'password')

const mapStateToProps = state => {
  const { userName, password, repeatPassword } = state.initialState.newUser
  return {
    initialValues: {
      userName,
      password,
      repeatPassword,
    }
  }
}

export default Account = connect(
  mapStateToProps,
  { forwardAccount }
)(Account)






