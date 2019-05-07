import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './EditingPage.scss'
import AccountEditing from './AccountEditing/AccountEditing'
import ContactsEditing from './ContactsEditing/ContactsEditing'
import CapabilitiesEditing from './CapabilitiesEditing/CapabilitiesEditing'
import ProfileEditing from './ProfileEditing/ProfileEditing'

const cx = classNames.bind(styles)

export const EditingPage = ({ location }) => {
  const { pathname } = location
  const id = pathname.slice(9, pathname.indexOf('/', 9))
  return (
    <div className={cx('container')}>
      <Link className={cx('linkBackPage')} to={`/EditUser/${id}`}>{'<  User Profile'}</Link>
      <h2 className={cx('headline')}>Editing</h2>
      <div className={cx('editingPage')}>
        <div className={cx('editingPage__tabs')}>
          <div className={cx('editingPage__tab', {
            activeTab: pathname.charAt(pathname.length - 2) >= 0,
          })}
          >
            <h2 className={cx('editingPage__h2')}>1. Account</h2>
          </div>
          <div className={cx('editingPage__tab', { activeTab: pathname.includes('/Profile') })}>
            <h2 className={cx('editingPage__h2')}>2. Profile</h2>
          </div>
          <div className={cx('editingPage__tab', { activeTab: pathname.includes('/Contacts') })}>
            <h2 className={cx('editingPage__h2')}>3. Contacts</h2>
          </div>
          <div className={cx('editingPage__tab', { activeTab: pathname.includes('/Capabilities') })}>
            <h2 className={cx('editingPage__h2')}>4. Capabilities</h2>
          </div>
        </div>
        <Switch>
          <Route exact path='/Editing/:id' component={AccountEditing} />
          <Route exact path='/Editing/:id/Profile' component={ProfileEditing} />
          <Route exact path='/Editing/:id/Contacts' component={ContactsEditing} />
          <Route exact path='/Editing/:id/Capabilities' component={CapabilitiesEditing} />
          <Redirect to='/NodFound' />
        </Switch>
      </div>
    </div>
  )
}

EditingPage.propTypes = {
  location: PropTypes.object.isRequired,
}
