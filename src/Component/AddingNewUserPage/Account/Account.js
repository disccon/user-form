import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Account.scss'
import CloseIcon from '../../../img/icon/CloseIcon'
import UserAvatar from '../../../img/icon/UserAvatar'
import { reduxForm, Field, SubmissionError } from 'redux-form';

const cx = classNames.bind(styles)




const renderFieldInput = ({ label, input, type, meta: { touched, error }, }) => (
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
    errors: [],
    isSubmitting: false,
    dataPassword: '',
    dataRepeatPassword: '',
  };
  onSubmit = values => {
    console.log(666,values)
    // const dis = SubmissionError
    // console.log(dis)
    console.log(111)
  }


  render() {
    const { accountPassword, repeatPassword, userName, changeTextFieldAddingNewUser, handleSubmit } = this.props
    const { errors } = this.state
    return (
      <Fragment>
        <div className={cx('windowNewUser__question')}>
          <span>You have an unsaved user data. Do you want to complete it?</span>
          <button className={cx('windowNewUser__continue')}>Continue</button>
          <button className={cx('windowNewUser__close')}><CloseIcon className={cx('closeIcon')}/></button>
        </div>
        <form className={cx('windowNewUser__register')} onSubmit={handleSubmit(this.onSubmit)}>
          <UserAvatar className={cx('userAvatar')}/>
          <div className={cx('register__userData')}>
            <Field className={cx('register__userName')} component={renderFieldInput} type="text"
                   label='User name' name="userName"/>
            <Field className={cx('register__password')} component={renderFieldInput} type="text"
                   label='Password' name="password"/>
            <Field className={cx('register__userName')} component={renderFieldInput} type="text"
                   label='Repeat Password' name="repeatPassword"/>
            <button type="submit" disabled={this.state.isSubmitting}>Forward</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

Account.propTypes = {}

const mapStateToProps = state => ({
  accountPassword: state.initialState.accountPassword,
  repeatPassword: state.initialState.repeatPassword,
})

// export default connect(
//   mapStateToProps,
//   { changeTextFieldAddingNewUser }
// )(Account)


export default reduxForm({
  validate: values => {
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
  },
  form: 'Account',
})(Account)


