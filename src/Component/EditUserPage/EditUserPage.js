import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './EditUserPage.scss'
import { ReactComponent as EditIcon } from '../../img/icon/edit.svg'
import { editUser } from '../../Actions'


const cx = classNames.bind(styles)


class EditUserPage extends Component {
  editUser = page => () => {
    const { editUser, pathname } = this.props
    editUser(Number(pathname.substring(10)), page)
  }

  backListUsersPage = () => {
    const { history } = this.props
    history.push('/ListUsers')
  }

  render() {
    const {
      userName, userSRCAvatarIMG, firstName, lastName, birthDate, email, address, company, fax,
      facebookLink, phoneN1, phoneN2, phoneN3, selectSkills, checkboxArt, checkboxSport, checkboxJustWant,
      checkboxFemale, checkboxGuitar, checkboxWtf,
    } = this.props
    return (
      <Fragment>
        <h2 className={cx('UserNamePageHeadline')}>User Name</h2>
        <h3 className={cx('UserNamePageH3')} onClick={this.backListUsersPage} >{'< Users List'}</h3>
        { birthDate && (
        <div className={cx('UserNamePageContainer containerTable')}>
          <img src={userSRCAvatarIMG} className={cx('UserNamePageContainer__avatar')} alt='userSRCAvatarIMG' />
          <div className={cx('accountDataWrapper')}>
            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Account</h4>
                <button type='button'>
                  <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/')} />
                </button>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>User name:</h4>
                  <h5>{userName}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Password</h4>
                  <h5>*******</h5>
                </div>
              </div>
            </div>
            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Personal</h4>
                <button type='button'>
                  <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/Profile')} />
                </button>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>First name:</h4>
                  <h5>{firstName}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Last name:</h4>
                  <h5>{lastName}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Birth date:</h4>
                  <h5>{birthDate.toLocaleDateString()}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Email:</h4>
                  <h5>{email}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Adress:</h4>
                  <h5>{address}</h5>
                </div>
              </div>
            </div>
            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Contacts</h4>
                <button type='button'>
                  <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/Contacts')} />
                </button>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Company:</h4>
                  <h5>{company}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Fax:</h4>
                  <h5>{fax}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Facebook Link:</h4>
                  <h5>{facebookLink}</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Phone #1:</h4>
                  <h5>{phoneN1}</h5>
                </div>
                {phoneN2 && (
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Phone #2:</h4>
                  <h5>{phoneN2}</h5>
                </div>
                ) }
                {phoneN3 && (
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Phone #3:</h4>
                  <h5>{phoneN3}</h5>
                </div>
                ) }
              </div>
            </div>
            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Capabilities</h4>
                <EditIcon className={cx('accountDataWrapper__editIcon')} onClick={this.editUser('/Capabilities')} />
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Skills:</h4>
                  <h5>
                    {selectSkills.map(user => (
                      `${user.value},  `
                    ))}
                  </h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Hobies:</h4>
                  <div className={cx('accountDataWrapper__wrapperH5')}>
                    {checkboxArt && <h5>{checkboxArt}</h5>}
                    {checkboxSport && <h5>{checkboxSport}</h5>}
                    {checkboxJustWant && <h5>{checkboxJustWant}</h5>}
                    {checkboxFemale && <h5>{checkboxFemale}</h5>}
                    {checkboxGuitar && <h5>{checkboxGuitar}</h5>}
                    {checkboxWtf && <h5>{checkboxWtf}</h5>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) }
      </Fragment>
    )
  }
}

EditUserPage.propTypes = {
  userName: PropTypes.string.isRequired,
  userSRCAvatarIMG: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  birthDate: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  fax: PropTypes.string.isRequired,
  facebookLink: PropTypes.string.isRequired,
  phoneN1: PropTypes.string.isRequired,
  phoneN2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  phoneN3: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  selectSkills: PropTypes.array.isRequired,
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
  history: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
}


const mapStateToProps = state => {
  const { pathname } = state.router.location
  const { users } = state.listUsers
  let editUser
  if (users.length >= 1) {
    editUser = users.find(i => i.id === Number(pathname.substring(10)))
    const {
      userName, userSRCAvatarIMG, firstName, lastName, birthDate, email, address, company, fax, facebookLink, phoneN1, phoneN2, phoneN3,
      selectSkills, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale, checkboxGuitar, checkboxWtf,
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
      pathname,
    }
  }
}

export default connect(
  mapStateToProps,
  { editUser },
)(EditUserPage)
