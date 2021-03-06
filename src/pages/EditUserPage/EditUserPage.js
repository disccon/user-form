import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import { Redirect, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import './EditUserPage.scss'
import EditUserAccount from './EditUserAccount/EditUserAccount'
import EditUserProfile from './EditUserProfile/EditUserProfile'
import EditUserContacts from './EditUserContacts/EditUserContacts'
import EditUserCapabilities from './EditUserCapabilities/EditUserCapabilities'

const EditUserPage = ({ pathname, id }) => (
  <div className='container'>
    <Link className='linkBackPage' to={`/user/${id}`}>{'<  User Profile'}</Link>
    <h2 className='headline'>Editing</h2>
    <div className='editPage'>
      <div className='editPage__tabs'>
        <div className={cn('editPage__tab', {
          activeTab: pathname.charAt(pathname.length - 1) >= 0,
        })}
        >
          <Link to={`/edit-user/${id}`} className='editPage__link'>1. Account</Link>
        </div>
        <div className={cn('editPage__tab', { activeTab: pathname.includes('/profile') })}>
          <Link to={`/edit-user/${id}/profile`} className='editPage__link'>2. Profile</Link>
        </div>
        <div className={cn('editPage__tab', { activeTab: pathname.includes('/contacts') })}>
          <Link to={`/edit-user/${id}/contacts`} className='editPage__link'>3. Contacts</Link>
        </div>
        <div className={cn('editPage__tab', { activeTab: pathname.includes('/capabilities') })}>
          <Link to={`/edit-user/${id}/capabilities`} className='editPage__link'>4. Capabilities</Link>
        </div>
      </div>
      <Switch>
        <Route exact path='/edit-user/:id' component={EditUserAccount} />
        <Route exact path='/edit-user/:id/profile' component={EditUserProfile} />
        <Route exact path='/edit-user/:id/contacts' component={EditUserContacts} />
        <Route exact path='/edit-user/:id/capabilities' component={EditUserCapabilities} />
        <Redirect to='/not-found' />
      </Switch>
    </div>
  </div>
)

EditUserPage.propTypes = {
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
)(EditUserPage)
