import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import styles from './EditingPage.scss'
import AccountEditing from './accountEditing/AccountEditing'
import ContactsEditing from './contactsEditing/ContactsEditing'
import CapabilitiesEditing from './capabilitiesEditing/CapabilitiesEditing'
import ProfileEditing from './profileEditing/ProfileEditing'

const cx = classNames.bind(styles)

const EditingPage = ({ pathname, id }) => (
  <div className={cx('container')}>
    <Link className={cx('linkBackPage')} to={`/user/${id}`}>{'<  User Profile'}</Link>
    <h2 className={cx('headline')}>Editing</h2>
    <div className={cx('editingPage')}>
      <div className={cx('editingPage__tabs')}>
        <div className={cx('editingPage__tab', {
          activeTab: pathname.charAt(pathname.length - 1) >= 0,
        })}
        >
          <Link to={`/edit-user/${id}`} className={cx('editingPage__link')}>1. Account</Link>
        </div>
        <div className={cx('editingPage__tab', { activeTab: pathname.includes('/profile') })}>
          <Link to={`/edit-user/${id}/profile`} className={cx('editingPage__link')}>2. Profile</Link>
        </div>
        <div className={cx('editingPage__tab', { activeTab: pathname.includes('/contacts') })}>
          <Link to={`/edit-user/${id}/contacts`} className={cx('editingPage__link')}>3. Contacts</Link>
        </div>
        <div className={cx('editingPage__tab', { activeTab: pathname.includes('/capabilities') })}>
          <Link to={`/edit-user/${id}/capabilities`} className={cx('editingPage__link')}>4. Capabilities</Link>
        </div>
      </div>
      <Switch>
        <Route exact path='/edit-user/:id' component={AccountEditing} />
        <Route exact path='/edit-user/:id/profile' component={ProfileEditing} />
        <Route exact path='/edit-user/:id/contacts' component={ContactsEditing} />
        <Route exact path='/edit-user/:id/capabilities' component={CapabilitiesEditing} />
        <Redirect to='/not-found' />
      </Switch>
    </div>
  </div>
)

EditingPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.id)
  const { pathname } = state.router.location
  return {
    pathname,
    id,
  }
}

export default connect(
  mapStateToProps,
)(EditingPage)
