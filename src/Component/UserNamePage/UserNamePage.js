import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './UserNamePage.scss'
import EditIcon from "../../img/icon/EditIcon";


const cx = classNames.bind(styles)


class UserNamePage extends Component {
  render() {
    return (
      <Fragment>
        <h2 className={cx('UserNamePageHeadline')}>User Name</h2>
        <h3 className={cx('UserNamePageH3')}><a>Users List</a></h3>
        <div className={cx('UserNamePageContainer')}>
          <img className={cx('UserNamePageContainer__avatar')}/>
          <div className={cx('accountDataWrapper')}>
            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Account</h4>
                <EditIcon className={cx('accountDataWrapper__editIcon')}/>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>User name:</h4>
                  <h5>username</h5>
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
                <EditIcon className={cx('accountDataWrapper__editIcon')}/>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>First name:</h4>
                  <h5>Maxim</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Last name:</h4>
                  <h5>Morozov</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Last name:</h4>
                  <h5>Morozov</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Birth date:</h4>
                  <h5>13.11.1997</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Email:</h4>
                  <h5>my_email@gmail.com</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Adress:</h4>
                  <h5>Street TRUE, 130, 12</h5>
                </div>
              </div>
            </div>


            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Contacts</h4>
                <EditIcon className={cx('accountDataWrapper__editIcon')}/>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Company:</h4>
                  <h5>Company name</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Fax:</h4>
                  <h5>asd123dsf</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Facebook Link:</h4>
                  <h5>facebook.com/</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Phone #1:</h4>
                  <h5>+38 (066) 123 123 11</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Phone #2:</h4>
                  <h5>+38 (066) 123 123 11</h5>
                </div>
              </div>
            </div>


            <div className={cx('accountDataWrapper__block')}>
              <div className={cx('accountDataWrapper__section')}>
                <h4>Capabilities</h4>
                <EditIcon className={cx('accountDataWrapper__editIcon')}/>
              </div>
              <div className={cx('accountDataWrapper__sectionInfo')}>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Skills:</h4>
                  <h5>Skill 1, Skill 2, Skill 3, Skill 4, Skill 5, Skill 6, Skill 7, Skill 8</h5>
                </div>
                <div className={cx('accountDataWrapper__wrapper')}>
                  <h4>Hobies:</h4>
                  <div className={cx('accountDataWrapper__wrapperH5')}>
                  <h5>Sport, fitness, aerobica and staff like that</h5>
                  <h5>I just want to play games, I’m not living in this life</h5>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </Fragment>
    )
  }
}

UserNamePage.propTypes = {}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
)(UserNamePage)