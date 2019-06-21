import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { push } from 'connected-react-router'
import './UsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import {
  fetchUsers, deleteUser, swapUsers, applyFilterUsers,
} from '../../actions/actionUsers'
import UserRow from './UserRow/UserRow'
import { Pagination } from './Pagination/Pagination'
import { validateUsersUrl } from '../../helpers/validateUsersUrl'
import preloaderIcon from '../../img/icon/preloader.gif'
import { getQueryString } from '../../helpers/valueQuery'
import MenuFilter from './MenuFilter/MenuFilter'

const SortableItem = SortableElement(({ user, deleteUser, oldIndex }) => (
  <UserRow
    key={user.id}
    user={user}
    deleteUser={deleteUser}
    oldIndex={oldIndex}
  />
))

const SortableList = SortableContainer(({
  users, deleteUser, isLoading, oldIndex,
}) => (
  <tbody className='usersPage__tbody'>
    <tr className='usersPage__firstTr'>
      <td>
        {isLoading && <img src={preloaderIcon} alt='preloader' className='usersPage__preloader' />}
      </td>
    </tr>
    {users.map((user, index) => (
      <SortableItem key={user.id} index={index} user={user} deleteUser={deleteUser} oldIndex={oldIndex} />
    ))}
  </tbody>
))

class UsersPage extends Component {
  state = {
    oldIndex: null,
  }

  componentDidMount() {
    const {
      applyFilterUsers, search, push,
    } = this.props
    if (validateUsersUrl(search)) {
      push('/not-found')
    } else {
      applyFilterUsers('fetchUsers')
    }
  }

  componentDidUpdate(prevProps) {
    const {
      applyFilterUsers, filteredUsers, pagesCount,
    } = this.props
    if (filteredUsers.length < prevProps.filteredUsers.length && pagesCount > 1) {
      applyFilterUsers('fetchUsers')
    }
  }

  searchUsers = ({ target }) => {
    const { fetchUsers, search } = this.props
    const { value } = target
    const queryString = getQueryString(search)
    fetchUsers(queryString.currentPage, queryString.per_page, value)
  }

  deleteUser = id => () => {
    const {
      push, deleteUser, filteredUsers, currentPage, pagesCount, per_page,
    } = this.props
    if (filteredUsers.length === 1 && currentPage === pagesCount && currentPage > 1) {
      push({ pathname: '/users', search: `page=${currentPage - 1}&per_page=${per_page}` })
    }
    deleteUser(id)
  }

  changePage = page => () => {
    const {
      push, searchQuery, fetchUsers, per_page,
    } = this.props
    fetchUsers(page, per_page, searchQuery)
    push({ pathname: '/users', search: `page=${page}&per_page=${per_page}` })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { swapUsers } = this.props
    if (oldIndex !== newIndex) {
      swapUsers(oldIndex, newIndex)
    }
    this.setState({
      oldIndex,
    })
  }

  shouldCancelStart = event => (
    ['input', 'button', 'svg', 'path'].indexOf(event.target.tagName.toLowerCase()) !== -1
      || event.target.className === 'userRow__deleteUserWrapper'
  )

  render() {
    const {
      isLoading, filteredUsers, currentPage, searchQuery, pagesCount,
    } = this.props
    const { oldIndex } = this.state
    return (
      <Fragment>
        <h2 className='headline'>List of users</h2>
        <input
          className='usersPage__search'
          type='search'
          onChange={this.searchUsers}
          value={searchQuery}
        />
        <MenuFilter />
        <table className='usersPageTable container'>
          <thead className='usersPage__thead'>
            <tr className='usersPage__tr'>
              <th className='usersPage__name'>name</th>
              <th className='usersPage__company'>company</th>
              <th className='usersPage__contacts'>contacts</th>
              <th className='usersPage__update'>last update</th>
            </tr>
          </thead>
          <SortableList
            users={filteredUsers}
            onSortEnd={this.onSortEnd}
            deleteUser={this.deleteUser}
            isLoading={isLoading}
            helperClass='userRow__move'
            shouldCancelStart={this.shouldCancelStart}
            oldIndex={oldIndex}
          />
        </table>
        {filteredUsers.length === 0 && !isLoading && <NoHaveUserRow />}
        {((currentPage > 1 && pagesCount > 0) || (currentPage === 1 && pagesCount > 1)) && (
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            changePage={this.changePage}
            limit={5}
          />
        )}
      </Fragment>
    )
  }
}

UsersPage.propTypes = {
  search: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagesCount: PropTypes.number,
  currentPage: PropTypes.number,
  filteredUsers: PropTypes.array.isRequired,
  push: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  swapUsers: PropTypes.func.isRequired,
  applyFilterUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    filteredUsers, isLoading, searchQuery, currentPage, pagesCount, per_page,
  } = state.usersReducer
  const { search } = state.router.location
  return {
    per_page,
    searchQuery,
    filteredUsers,
    isLoading,
    search,
    currentPage,
    pagesCount,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchUsers, push, deleteUser, swapUsers, applyFilterUsers,
  },
)(UsersPage)
