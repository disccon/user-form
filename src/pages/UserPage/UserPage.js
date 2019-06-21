import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './UserPage.scss'
import { ReactComponent as EditIcon } from '../../img/icon/edit.svg'
import { fetchEditUser, saveCropperAvatar } from '../../actions/actionEditUser'
import CropperModal from '../../components/CropperModalWindow/CropperModal'

class UserPage extends Component {
  state = {
    isModal: null,
  }

  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  setCropperSrc = isCropper => () => {
    this.setState({
      isModal: isCropper,
    })
  }

  render() {
    const { isModal } = this.state
    const { id, editUser, saveCropperAvatar } = this.props
    const {
      userName, userAvatarIMG, firstName, lastName, birthDate, email, address, company, fax,
      facebookLink, phoneArray, skills, checkboxArt, checkboxSport, checkboxJustWant,
      checkboxFemale, checkboxGuitar, checkboxWtf, userAvatarIMGCropper,
    } = editUser
    return (
      <div className='container'>
        <Link className='linkBackPage' to='/users'>{'<  Users List'}</Link>
        <h2 className='headline'>User Name</h2>
        {birthDate && (
          <div className='userNamePage container'>
            <div className='userNamePage__wrapperImg'>
              <img src={userAvatarIMGCropper} className='userNamePage__avatar' alt='userSRCAvatarIMG' />
              <button
                type='button'
                className='userNamePage__cropImage'
                onClick={this.setCropperSrc(true)}
              >
                Crop Avatar
              </button>
            </div>
            <div className='accountDataWrapper'>
              <div className='accountDataWrapper__block'>
                <div className='accountDataWrapper__section'>
                  <h3 className='accountDataWrapper__h3'>Account</h3>
                  <Link to={`/edit-user/${id}`}>
                    <button type='button' className='accountDataWrapper__buttonEdit'>
                      <EditIcon className='accountDataWrapper__editIcon' />
                    </button>
                  </Link>
                </div>
                <div className='accountDataWrapper__sectionInfo'>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>User name:</h4>
                    <span className='accountDataWrapper__span'>{userName}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Password</h4>
                    <span className='accountDataWrapper__span'>*******</span>
                  </div>
                </div>
              </div>
              <div className='accountDataWrapper__block'>
                <div className='accountDataWrapper__section'>
                  <h3 className='accountDataWrapper__h3'>Personal</h3>
                  <Link to={`/edit-user/${id}/profile`}>
                    <button type='button' className='accountDataWrapper__buttonEdit'>
                      <EditIcon className='accountDataWrapper__editIcon' />
                    </button>
                  </Link>
                </div>
                <div className='accountDataWrapper__sectionInfo'>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>First name:</h4>
                    <span className='accountDataWrapper__span'>{firstName}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Last name:</h4>
                    <span className='accountDataWrapper__span'>{lastName}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Birth date:</h4>
                    <span className='accountDataWrapper__span'>{birthDate.toLocaleDateString()}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Email:</h4>
                    <span className='accountDataWrapper__span'>{email}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Address:</h4>
                    <span className='accountDataWrapper__span'>{address}</span>
                  </div>
                </div>
              </div>
              <div className='accountDataWrapper__block'>
                <div className='accountDataWrapper__section'>
                  <h3 className='accountDataWrapper__h3'>Contacts</h3>
                  <Link to={`/edit-user/${id}/contacts`}>
                    <button type='button' className='accountDataWrapper__buttonEdit'>
                      <EditIcon className='accountDataWrapper__editIcon' />
                    </button>
                  </Link>
                </div>
                <div className='accountDataWrapper__sectionInfo'>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Company:</h4>
                    <span className='accountDataWrapper__span'>{company}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Fax:</h4>
                    <span className='accountDataWrapper__span'>{fax}</span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Facebook Link:</h4>
                    <a
                      className='accountDataWrapper__span accountDataWrapper__a'
                      href={`https://${facebookLink}`}
                    >
                      {facebookLink}
                    </a>
                  </div>
                  {phoneArray.map((phone, index) => (
                    <div key={index} className='accountDataWrapper__wrapper'>
                      <h4 className='accountDataWrapper__h4'>
                        {`Phone #${index + 1}:`}
                      </h4>
                      <span className='accountDataWrapper__span'>{phoneArray[index].phone}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className='accountDataWrapper__block'>
                <div className='accountDataWrapper__section'>
                  <h3 className='accountDataWrapper__h3'>Capabilities</h3>
                  <Link to={`/edit-user/${id}/capabilities`}>
                    <button type='button' className='accountDataWrapper__buttonEdit'>
                      <EditIcon className='accountDataWrapper__editIcon' />
                    </button>
                  </Link>
                </div>
                <div className='accountDataWrapper__sectionInfo'>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Skills:</h4>
                    <span className='accountDataWrapper__span'>
                      {skills.map(user => (
                        `${user.value},  `
                      ))}
                    </span>
                  </div>
                  <div className='accountDataWrapper__wrapper'>
                    <h4 className='accountDataWrapper__h4'>Hobbies:</h4>
                    <div className='accountDataWrapper__wrapperHobbies'>
                      {checkboxArt && <span className='accountDataWrapper__span'>{checkboxArt}</span>}
                      {checkboxSport && <span className='accountDataWrapper__span'>{checkboxSport}</span>}
                      {checkboxJustWant && <span className='accountDataWrapper__span'>{checkboxJustWant}</span>}
                      {checkboxFemale && <span className='accountDataWrapper__span'>{checkboxFemale}</span>}
                      {checkboxGuitar && <span className='accountDataWrapper__span'>{checkboxGuitar}</span>}
                      {checkboxWtf && <span className='accountDataWrapper__span'>{checkboxWtf}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModal && (
          <CropperModal
            cropperSrc={userAvatarIMG}
            setCropperSrc={this.setCropperSrc}
            changeAvatar={saveCropperAvatar}
          />
        )}
      </div>
    )
  }
}

UserPage.propTypes = {
  editUser: PropTypes.object.isRequired,
  fetchEditUser: PropTypes.func.isRequired,
  id: PropTypes.number,
  saveCropperAvatar: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const { editUser } = state.editUserReducer
  return {
    editUser,
    id,
  }
}

export default connect(
  mapStateToProps,
  { fetchEditUser, saveCropperAvatar },
)(UserPage)
