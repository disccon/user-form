import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Contacts.scss'
import AddICon from '../../../img/icon/AddICon'



const cx = classNames.bind(styles)


class Contacts extends Component {
  render() {
    return (
      <Fragment>
        <div className={cx('contacts')}>
          <div className={cx('contacts__sideLeft')}>
            <span>Company</span>
            <input type="text" className={cx('contacts__company')}/>
            <div className={cx('wrapperSpan')}>
              <span>Githuub link</span>
              <span>*</span>
            </div>
            <input type="text" className={cx('contacts__githuubLink')}/>
            <div className={cx('wrapperSpan')}>
              <span>Facebook link</span>
              <span>*</span>
            </div>
            <input type="text" className={cx('contacts__facebookLink')} value="www.facebook.com/hdfk_142_23lelf/" />
            <span>Main language</span>
            <input type="text" className={cx('contacts__mainLanguage')} value="Eng" />
          </div>
          <div className={cx('contacts__sideRight')}>
            <div className={cx('wrapperSpan')}>
              <span>Fax</span>
              <span>*</span>
            </div>
              <input type="text" className={cx('contacts__Fax')}/>
              <div className={cx('wrapperSpan')}>
                <span>Phone #1</span>
                <span>*</span>
              </div>
              <input type="text" className={cx('contacts__phone1')} value="+38 (066) 888 88 88"/>
              <div className={cx('wrapperSpan')}>
                <span>Phone #2</span>
                <span>*</span>
              </div>
              <input type="text" className={cx('contacts__phone2')}  />
              <button className={cx('contacts__addPhone')}><AddICon className={cx('contacts__addICon')}/>add phone number</button>
              <div className={cx('contacts__addPhone')}></div>
            <div className={cx('wrapperButton')}>
              <button className={cx('profile__back')}>Back</button>
              <button className={cx('profile__forward')}>Forward</button>
            </div>

          </div>
        </div>
      </Fragment>
    )
  }
}

Contacts.propTypes = {}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
)(Contacts)