import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './EditUserPage.scss'
import { ReactComponent as EditIcon } from '../../img/icon/edit.svg'
import { fetchEditUser } from '../../actions/actionEditUser'

const cx = classNames.bind(styles)

class EditUserPage extends Component {
  componentDidMount() {
    const { fetchEditUser, id } = this.props
    fetchEditUser(id)
  }

  render() {
    const { id, editUser } = this.props
    const {
      userName, userSRCAvatarIMG, firstName, lastName, birthDate, email, address, company, fax,
      facebookLink, phoneArray, selectSkills, checkboxArt, checkboxSport, checkboxJustWant,
      checkboxFemale, checkboxGuitar, checkboxWtf,
    } = editUser
    return (
      <div className={cx('container')}>
        <Link className={cx('linkBackPage')} to='/users'>{'<  Users List'}</Link>
        <h2 className={cx('headline')}>User Name</h2>
        {birthDate && (
          <div className={cx('userNamePageContainer container')}>
            <img src={userSRCAvatarIMG} className={cx('userNamePageContainer__avatar')} alt='userSRCAvatarIMG' />
            <div className={cx('accountDataWrapper')}>
              <div className={cx('accountDataWrapper__block')}>
                <div className={cx('accountDataWrapper__section')}>
                  <h3 className={cx('accountDataWrapper__h3')}>Account</h3>
                  <Link to={`/edit-user/${id}`}>
                    <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                      <EditIcon className={cx('accountDataWrapper__editIcon')} />
                    </button>
                  </Link>
                </div>
                <div className={cx('accountDataWrapper__sectionInfo')}>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>User name:</h4>
                    <span className={cx('accountDataWrapper__span')}>{userName}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Password</h4>
                    <span className={cx('accountDataWrapper__span')}>*******</span>
                  </div>
                </div>
              </div>
              <div className={cx('accountDataWrapper__block')}>
                <div className={cx('accountDataWrapper__section')}>
                  <h3 className={cx('accountDataWrapper__h3')}>Personal</h3>
                  <Link to={`/edit-user/${id}/profile`}>
                    <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                      <EditIcon className={cx('accountDataWrapper__editIcon')} />
                    </button>
                  </Link>
                </div>
                <div className={cx('accountDataWrapper__sectionInfo')}>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>First name:</h4>
                    <span className={cx('accountDataWrapper__span')}>{firstName}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Last name:</h4>
                    <span className={cx('accountDataWrapper__span')}>{lastName}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Birth date:</h4>
                    <span className={cx('accountDataWrapper__span')}>{birthDate.toLocaleDateString()}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Email:</h4>
                    <span className={cx('accountDataWrapper__span')}>{email}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Adress:</h4>
                    <span className={cx('accountDataWrapper__span')}>{address}</span>
                  </div>
                </div>
              </div>
              <div className={cx('accountDataWrapper__block')}>
                <div className={cx('accountDataWrapper__section')}>
                  <h3 className={cx('accountDataWrapper__h3')}>Contacts</h3>
                  <Link to={`/edit-user/${id}/contacts`}>
                    <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                      <EditIcon className={cx('accountDataWrapper__editIcon')} />
                    </button>
                  </Link>
                </div>
                <div className={cx('accountDataWrapper__sectionInfo')}>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Company:</h4>
                    <span className={cx('accountDataWrapper__span')}>{company}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Fax:</h4>
                    <span className={cx('accountDataWrapper__span')}>{fax}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Facebook Link:</h4>
                    <a
                      className={cx('accountDataWrapper__span accountDataWrapper__a')}
                      href={`https://${facebookLink}`}
                    >
                      {facebookLink}
                    </a>
                  </div>
                  {phoneArray.map((phone, index) => (
                    <div key={index} className={cx('accountDataWrapper__wrapper')}>
                      <h4 className={cx('accountDataWrapper__h4')}>
                        {`Phone #${index + 1}:`}
                      </h4>
                      <span className={cx('accountDataWrapper__span')}>{phoneArray[index].phone}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx('accountDataWrapper__block')}>
                <div className={cx('accountDataWrapper__section')}>
                  <h3 className={cx('accountDataWrapper__h3')}>Capabilities</h3>
                  <Link to={`/edit-user/${id}/capabilities`}>
                    <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                      <EditIcon className={cx('accountDataWrapper__editIcon')} />
                    </button>
                  </Link>
                </div>
                <div className={cx('accountDataWrapper__sectionInfo')}>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Skills:</h4>
                    <span className={cx('accountDataWrapper__span')}>
                      {selectSkills.map(user => (
                        `${user.value},  `
                      ))}
                    </span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Hobbies:</h4>
                    <div className={cx('accountDataWrapper__wrapperHobbies')}>
                      {checkboxArt && <span className={cx('accountDataWrapper__span')}>{checkboxArt}</span>}
                      {checkboxSport && <span className={cx('accountDataWrapper__span')}>{checkboxSport}</span>}
                      {checkboxJustWant && <span className={cx('accountDataWrapper__span')}>{checkboxJustWant}</span>}
                      {checkboxFemale && <span className={cx('accountDataWrapper__span')}>{checkboxFemale}</span>}
                      {checkboxGuitar && <span className={cx('accountDataWrapper__span')}>{checkboxGuitar}</span>}
                      {checkboxWtf && <span className={cx('accountDataWrapper__span')}>{checkboxWtf}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

EditUserPage.propTypes = {
  editUser: PropTypes.object.isRequired,
  fetchEditUser: PropTypes.func.isRequired,
  id: PropTypes.number,
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
  { fetchEditUser },
)(EditUserPage)
