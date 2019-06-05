import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import ProfileForm from '../../../components/UserFormBox/ProfileForm/ProfileForm'
import { fetchEditUser, saveEditUserData } from '../../../actions/actionEditUser'
import styles from '../../../components/UserFormBox/UserFormBox.scss'
import { asyncValidateEditProfile } from '../../../components/UserFormBox/validateForm/asyncValidateEditProfile'

const cx = classNames.bind(styles)

class EditUserProfile extends Component {
  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  onSubmit = values => {
    const {
      id, saveEditUserData, push,
    } = this.props
    saveEditUserData(values, id)
    push(`/user/${id}`)
  }

  render() {
    const { id } = this.props
    const wrapperButton = (
      <button type='submit' className={cx('userFormBox__forward')}>
        Save
      </button>
    )
    return (
      <ProfileForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['firstName', 'lastName', 'birthDate', 'email', 'address', 'gender'])}
        asyncValidateProfile={asyncValidateEditProfile}
        id={id}
      />
    )
  }
}

EditUserProfile.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  fetchEditUser: PropTypes.func.isRequired,
  saveEditUserData: PropTypes.func.isRequired,
  push: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    firstName, lastName, birthDate, email, address, gender,
  } = state.editUserReducer.editUser
  return {
    firstName,
    lastName,
    birthDate,
    email,
    address,
    gender,
    id,
  }
}

export default connect(
  mapStateToProps,
  { push, saveEditUserData, fetchEditUser },
)(EditUserProfile)
