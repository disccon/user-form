import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import styles from './AccountEditing.scss'
import { ReactComponent as UserAvatarIcon } from '../../../img/icon/UserAvatar.svg'
import { ReactComponent as AddIcon } from '../../../img/icon/add.svg'
import { accountEditingSave } from '../../../Actions'
import { renderFieldInputAccount } from './renderFieldInputAccount/renderFieldInputAccount'


const cx = classNames.bind(styles)


class AccountEditing extends Component {
    state = {
      avatarIMGError: null,
      typeFieldPassword: 'text',
      userSRCAvatarIMGState: this.props.userSRCAvatarIMG,
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
            userSRCAvatarIMGState: reader.result,
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
      const { accountEditingSave, id } = this.props
      const { userSRCAvatarIMGState } = this.state
      accountEditingSave(values.userName, values.password, values.repeatPassword, userSRCAvatarIMGState, id)
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
      const { handleSubmit } = this.props
      const { avatarIMGError, typeFieldPassword, userSRCAvatarIMGState } = this.state
      const userAvatarIMG = userSRCAvatarIMGState
        ? <img className={cx('accountComponent__userAvatarIMG')} src={userSRCAvatarIMGState} alt='userAvatar' />
        : <UserAvatarIcon className={cx('accountComponent__userAvatarSVG')} alt='userAvatar' />
      const UserAvatar = avatarIMGError
        ? <p className={cx('accountComponent__avatarError')}>{avatarIMGError}</p> : null
      return (
        <Fragment>
          <form className={cx('accountComponent__form')} onSubmit={handleSubmit(this.onSubmit)}>
            <div className={cx('accountComponent__userAvatarWrapper')} >
              <label htmlFor='userAvatar'>
                {userAvatarIMG}
                <input
                  id='userAvatar'
                  type='file'
                  className={cx('accountComponent__inputFile')}
                  accept='image/*,image/jpeg'
                  onChange={this.addImageUserAvatar}
                />
              </label>
              <label htmlFor='userAvatarIMG' className={cx('accountComponent__labelSpan')}>
                <AddIcon className={cx('accountComponent__AddICon')} alt='addAvatar' />
                <span className={cx('accountComponent__addAvatarSpan')}>add avatar</span>
                <input
                  id='userAvatarIMG'
                  type='file'
                  className={cx('accountComponent__inputFile')}
                  accept='image/*,image/jpeg'
                  onChange={this.addImageUserAvatar}
                />
              </label>
              {UserAvatar}
            </div>
            <div className={cx('register__userData')}>
              <Field
                component={renderFieldInputAccount}
                type='text'
                label='User name'
                name='userName'
                idInput='userName'
              />
              <Field
                component={renderFieldInputAccount}
                type={typeFieldPassword}
                isVisibility
                label='Password'
                name='password'
                idInput='password'
                changeTypePassword={this.changeTypePassword}
              />
              <Field
                component={renderFieldInputAccount}
                type={typeFieldPassword}
                isVisibility
                label='Repeat Password'
                name='repeatPassword'
                idInput='repeatPassword'
                changeTypePassword={this.changeTypePassword}
              />
              <button className={cx('saveNewListButton')} type='submit' >Save</button>
            </div>
          </form>
        </Fragment>
      )
    }
}


AccountEditing = reduxForm({
  validate: (values, props) => {
    const errors = {}
    const { userNameList } = props
    if (!values.userName) {
      errors.userName = 'Missing User Name'
    } else if (values.userName.length <= 3) {
      errors.userName = 'Must be 4 characters or more'
    } else {
      userNameList.find(userName => (
        errors.userName = values.userName === userName ? 'already have this user in the database' : null))
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
  form: 'AccountEditing',
  enableReinitialize: true,
})(AccountEditing)


AccountEditing.propTypes = {
  id: PropTypes.number.isRequired,
  userSRCAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  accountEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
}


const mapStateToProps = state => {
  const { users } = state.listUsers
  const { pathname } = state.router.location
  const id = (pathname.slice(9, pathname.length - 1))
  const user = { ...users[id - 1] }
  const {
    userName, password, repeatPassword, userSRCAvatarIMG,
  } = user
  const userFilterName = users.filter(user => user.id !== id)
  const userNameList = userFilterName.map(user => user.userName)
  return {
    initialValues: {
      userName, password, repeatPassword,
    },
    userSRCAvatarIMG,
    userNameList,
    id,
  }
}

export default connect(
  mapStateToProps,
  { accountEditingSave },
)(AccountEditing)
