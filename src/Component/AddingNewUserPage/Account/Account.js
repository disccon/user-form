import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Account.scss'
import CloseIcon from '../../../img/icon/CloseIcon'
import UserAvatar from '../../../img/icon/UserAvatar'
import { reduxForm, Field, formValueSelector } from 'redux-form';


import { ReactComponent as Logoss } from '../../../img/icon/add.svg'

import { changeTextFieldAddingNewUser } from '../../../Actions'

const cx = classNames.bind(styles)


const validate = values => {
  const errors = {};

  if (!values.userName) { errors.userName = 'Missing User Name'}
  if (!values.password) { errors.password = 'Missing Password' }
  if (!values.repeatPassword) { errors.repeatPassword = 'Missing Repeat Password'}
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


const onSubmit = values => {
  console.log(666, values)
  // const dis = SubmissionError
  // console.log(dis)
  console.log(111)
}

export const renderFieldInput = ({ label, input, type, meta: { touched, error } }) => {
  return(
    <label>
      <h4>{label}</h4>
      <div>
        <input {...input} type={type}/>
        {touched && error && <p className={cx('register__error')}>{error}</p>}
      </div>
    </label>
  )
}


class Account extends Component {
  render() {
    // console.log(this.props.paasssword)
    const { handleSubmit } = this.props
    return (
      <Fragment>
        <div className={cx('accountComponent__question')}>
          <span>You have an unsaved user data. Do you want to complete it?</span>
          <button className={cx('accountComponent__continue')}>Continue</button>
          <button className={cx('accountComponent__close')}><CloseIcon className={cx('closeIcon')}/></button>
        </div>
        <form className={cx('accountComponent__form')} onSubmit={handleSubmit}>
          <div className={cx('accountComponent__userAvatarWrapper')}>
            <UserAvatar className={cx('accountComponent__userAvatar')}/>
            <button type="button" className={cx('accountComponent__addAvatarButton')}>
              <Logoss className={cx('accountComponent__AddICon')} alt="addAvatar"/>
               add avatar
            </button>
          </div>
          <div className={cx('register__userData')}>
            <Field className={cx('register__userName')} component={renderFieldInput} type="text"
                   label='User name' name="userName"/>
            <Field className={cx('register__password')} component={renderFieldInput} type="text" valueField={[11111]}
                   label='Password' name="password"/>
            <Field className={cx('register__userName')} component={renderFieldInput} type="text"
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



Account = reduxForm({
  validate,
  form: 'Account',
  onSubmit: onSubmit,
})(Account)

//const selector = formValueSelector('Account')
//const haspassword = selector(state, 'password')

const mapStateToProps = state => {
  const { userName, password, repeatPassword } = state.initialState.newUser
  return {
    fullName: '111',
    initialValues: {
      userName,
      password,
      repeatPassword,
    }
  }
}

export default Account = connect(
  mapStateToProps,
  { changeTextFieldAddingNewUser }
)(Account)






