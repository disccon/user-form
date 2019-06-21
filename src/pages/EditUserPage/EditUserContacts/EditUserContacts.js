import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import ContactsForm from '../../../components/UserFormBox/ContactsForm/ContactsForm'
import { fetchEditUser, saveEditUserData } from '../../../actions/actionEditUser'
import '../../../components/UserFormBox/UserFormBox.scss'


class EditUserContacts extends Component {
  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  onSubmit = values => {
    const { push, id, saveEditUserData } = this.props
    push(`/user/${id}`)
    saveEditUserData(values, id)
  }

  render() {
    const wrapperButton = <button type='submit' className='userFormBox__forward'>Save</button>
    return (
      <ContactsForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['company', 'githubLink', 'facebookLink', 'language',
          'fax', 'phoneArray'])}
      />
    )
  }
}

EditUserContacts.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  fetchEditUser: PropTypes.func,
  push: PropTypes.func.isRequired,
  saveEditUserData: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    company, githubLink, facebookLink, language, fax, phoneArray,
  } = state.editUserReducer.editUser
  return {
    company,
    githubLink,
    facebookLink,
    language,
    fax,
    phoneArray,
    id,
  }
}

export default connect(
  mapStateToProps,
  { push, saveEditUserData, fetchEditUser },
)(EditUserContacts)
