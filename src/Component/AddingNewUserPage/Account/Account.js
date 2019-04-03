import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Account.scss'
import { ReactComponent as CloseIcon } from '../../../img/icon/closeIcon.svg'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { forwardAccount, saveUserSRCAvatarIMG } from '../../../Actions'
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
      {touched && error && <p>{error}</p>}
    </div>
  </label>
)


class Account extends Component {
  state = {
    file: '',
    isUserAvatar: false,
  }
  addImageUserAvatar = event => {
    event.preventDefault();
    const { saveUserSRCAvatarIMG } = this.props
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: file,
        isUserAvatar: false,
      })
      saveUserSRCAvatarIMG(reader.result)
    }
    reader.readAsDataURL(file)
  }
  onSubmit = values => {
    const { forwardAccount, userSRCAvatarIMG } = this.props;
    if (!userSRCAvatarIMG) {
      this.setState({
        isUserAvatar: true,
      })
    } else {
      forwardAccount(values.userName, values.password, values.repeatPassword)
    }
  }

  render() {
    const { handleSubmit, userSRCAvatarIMG } = this.props
    const { isUserAvatar } = this.state
    const userAvatarIMG = userSRCAvatarIMG ?
      <img className={cx('accountComponent__userAvatarIMG')} src={userSRCAvatarIMG}/> :
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






