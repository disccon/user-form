import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import queryString from 'query-string'
import { push } from 'connected-react-router'
import styles from './UsersPage.scss'
import NoHaveUserRow from './noHaveUserRow/NoHaveUserRow'
import {
  fetchUsers, deleteUser, searchingUsers, loadingInterval,
} from '../../actions/actionUsers'
import UserRow from './userRow/UserRow'
import { Pagination } from './pagination/Pagination'
import { getFilterUsers } from '../../helpers/getFilterUsers'
import { validateUsersUrl } from '../../helpers/validateUsersUrl'
import preloaderIcon from '../../img/icon/preloader.gif'

const cx = classNames.bind(styles)

class UsersPage extends Component {
  componentDidMount() {
    const {
      fetchUsers, search, push,
    } = this.props
    if (validateUsersUrl(search)) {
      push('/not-found')
    } else {
      fetchUsers()
    }
  }

  searchingUsersFilter = ({ target }) => {
    const { searchingUsers } = this.props
    const { value } = target
    searchingUsers(value)
  }

  deleteUser = id => () => {
    const {
      deleteUser, currentPage, pagesCount, search, perPage
    } = this.props
    const valueQuery = queryString.parse(search)
    const per_page = Number(valueQuery.per_page) || perPage
    deleteUser(id, currentPage, pagesCount, per_page)
  }

  changePage = page => () => {
    const {
      push, search, perPage, loadingInterval,
    } = this.props
    const valueQuery = queryString.parse(search)
    const per_page = Number(valueQuery.per_page) || perPage
    loadingInterval()
    push({ pathname: '/users', search: `?page=${page}&per_page=${per_page}` })
  }

  render() {
    const {
      isLoading, listUsers, currentPage, filterUsers, pagesCount,
    } = this.props
    return (
      <Fragment>
        <h2 className={cx('headline')}>List of users</h2>
        <input
          className={cx('usersPage__search')}
          type='search'
          onChange={this.searchingUsersFilter}
          value={filterUsers}
        />
        <table className={cx('usersPageTable container')}>
          <thead className={cx('usersPage__thead')}>
            <tr className={cx('usersPage__tr')}>
              <th className={cx('usersPage__name')}>name</th>
              <th className={cx('usersPage__company')}>company</th>
              <th className={cx('usersPage__contacts')}>contacts</th>
              <th className={cx('usersPage__update')}>last update</th>
            </tr>
          </thead>
          <tbody>
            <tr className={cx('usersPage__firstTr')} />
            {listUsers.length > 0 && !isLoading && listUsers.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {listUsers.length === 0 && !isLoading && <NoHaveUserRow />}
        {pagesCount > 1 && !isLoading && (
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            changePage={this.changePage}
            limit={5}
          />
        )}
        {isLoading && <img src={preloaderIcon} alt='preloader' className={cx('usersPage__preloader')} />}
      </Fragment>
    )
  }
}

UsersPage.propTypes = {
  search: PropTypes.string,
  filterUsers: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchingUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    filterUsers, users, isLoading, perPage,
  } = state.usersReducer
  const { search } = state.router.location
  if (!isLoading) {
    const userFilter = getFilterUsers(state)
    return {
      search,
      listUsers: userFilter.users,
      total: userFilter.total,
      currentPage: userFilter.currentPage,
      pagesCount: userFilter.pagesCount,
      perPage,
      filterUsers,
      isLoading,
    }
  }
  return {
    search,
    perPage,
    listUsers: users,
    filterUsers,
    isLoading,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchUsers, push, deleteUser, searchingUsers, loadingInterval,
  },
)(UsersPage)
