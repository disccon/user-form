import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import _ from 'lodash/core'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { fetchEditUser, saveEditUserData } from '../../../actions/actionEditUser'
import CapabilitiesForm from '../../../components/UserFormBox/CapabilitiesForm/CapabilitiesForm'
import '../../../components/UserFormBox/UserFormBox.scss'

class EditUserCapabilities extends Component {
  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  onSubmit = values => {
    const {
      id, push, saveUserData,
    } = this.props
    saveUserData(values, id)
    push(`/user/${id}`)
  }

  render() {
    const wrapperButton = (
      <Fragment>
        <button type='button' onClick={this.backCapabilities} className='userFormBox__back'>Back</button>
        <button type='submit' className='userFormBox__forward'>Forward</button>
      </Fragment>
    )
    return (
      <CapabilitiesForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['skills', 'textareaField', 'checkboxArt', 'checkboxSport',
          'checkboxJustWant', 'checkboxFemale', 'checkboxGuitar', 'checkboxWtf'])}
      />
    )
  }
}

EditUserCapabilities.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  saveUserData: PropTypes.func,
  push: PropTypes.func.isRequired,
  fetchEditUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const {
    skills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale,
    checkboxGuitar, checkboxWtf,
  } = state.editUserReducer.editUser
  return {
    skills,
    textareaField,
    checkboxArt,
    checkboxSport,
    checkboxJustWant,
    checkboxFemale,
    checkboxGuitar,
    checkboxWtf,
    id,
  }
}

export default connect(
  mapStateToProps,
  { push, saveUserData: saveEditUserData, fetchEditUser },
)(EditUserCapabilities)
