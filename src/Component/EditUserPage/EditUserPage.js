import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './EditUserPage.scss'
import { ReactComponent as EditIcon } from '../../img/icon/edit.svg'
import { editUser } from '../../Actions'

const cx = classNames.bind(styles)

class EditUserPage extends Component {
  editUser = page => () => {
    const { editUser, id } = this.props
    editUser(id, page)
  }

  render() {
    const {
      userName, userSRCAvatarIMG, firstName, lastName, birthDate, email, address, company, fax,
      facebookLink, phoneN1, phoneN2, phoneN3, selectSkills, checkboxArt, checkboxSport, checkboxJustWant,
      checkboxFemale, checkboxGuitar, checkboxWtf,
    } = this.props
    return (
      <div className={cx('container')}>
        <Link className={cx('linkBackPage')} to='/ListUsers'>{'<  Users List'}</Link>
        <h2 className={cx('headline')}>User Name</h2>
        {birthDate && (
          <div className={cx('userNamePageContainer container')}>
            <img src={userSRCAvatarIMG} className={cx('userNamePageContainer__avatar')} alt='userSRCAvatarIMG' />
            <div className={cx('accountDataWrapper')}>
              <div className={cx('accountDataWrapper__block')}>
                <div className={cx('accountDataWrapper__section')}>
                  <h3 className={cx('accountDataWrapper__h3')}>Account</h3>
                  <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                    <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/')} />
                  </button>
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
                  <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                    <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/Profile')} />
                  </button>
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
                  <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                    <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/Contacts')} />
                  </button>
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
                    <span className={cx('accountDataWrapper__span')}>{facebookLink}</span>
                  </div>
                  <div className={cx('accountDataWrapper__wrapper')}>
                    <h4 className={cx('accountDataWrapper__h4')}>Phone #1:</h4>
                    <span className={cx('accountDataWrapper__span')}>{phoneN1}</span>
                  </div>
                  {phoneN2 && (
                    <div className={cx('accountDataWrapper__wrapper')}>
                      <h4 className={cx('accountDataWrapper__h4')}>Phone #2:</h4>
                      <span className={cx('accountDataWrapper__span')}>{phoneN2}</span>
                    </div>
                  )}
                  {phoneN3 && (
                    <div className={cx('accountDataWrapper__wrapper')}>
                      <h4 className={cx('accountDataWrapper__h4')}>Phone #3:</h4>
                      <span className={cx('accountDataWrapper__span')}>{phoneN3}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={cx('accountDataWrapper__block')}>
                <div className={cx('accountDataWrapper__section')}>
                  <h3 className={cx('accountDataWrapper__h3')}>Capabilities</h3>
                  <button type='button' className={cx('accountDataWrapper__buttonEdit')}>
                    <EditIcon
                      className={cx('accountDataWrapper__editIcon')}
                      onClick={this.editUser('/Capabilities')}
                    />
                  </button>
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
  userName: PropTypes.string,
  userSRCAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  birthDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  email: PropTypes.string,
  address: PropTypes.string,
  company: PropTypes.string,
  fax: PropTypes.string,
  facebookLink: PropTypes.string,
  phoneN1: PropTypes.string,
  phoneN2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  phoneN3: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  selectSkills: PropTypes.array,
  checkboxArt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxSport: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxJustWant: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxFemale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxGuitar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  checkboxWtf: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  editUser: PropTypes.func.isRequired,
  id: PropTypes.number,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const { users } = state.listUsers
  let editUser
  if (users.length >= 1) {
    editUser = users.find(i => i.id === id)
    const {
      userName, userSRCAvatarIMG, firstName, lastName, birthDate, email, address, company, fax, facebookLink, phoneN1,
      phoneN2, phoneN3, selectSkills, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale, checkboxGuitar,
      checkboxWtf,
    } = editUser
    return {
      userName,
      userSRCAvatarIMG,
      firstName,
      lastName,
      birthDate,
      email,
      address,
      company,
      fax,
      facebookLink,
      phoneN1,
      phoneN2,
      phoneN3,
      selectSkills,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
      id,
    }
  }
  return {
    birthDate: false,
  }
}

export default connect(
  mapStateToProps,
  { editUser },
)(EditUserPage)
