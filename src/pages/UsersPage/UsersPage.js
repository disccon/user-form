import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import styles from './UsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import { fetchUsers, deleteUser } from '../../actions/actionUsers'
import UserRow from './UserRow/UserRow'
import { Pagination } from './Pagination/Pagination'
import { validateUsersUrl } from '../../helpers/validateUsersUrl'
import preloaderIcon from '../../img/icon/preloader.gif'
import { getQueryString } from '../../helpers/valueQuery'

const cx = classNames.bind(styles)


class UsersPage extends Component {
  componentDidMount() {
    const {
      fetchUsers, search, push, searchQuery,
    } = this.props
    if (validateUsersUrl(search)) {
      push('/not-found')
    } else {
      const queryString = getQueryString(search)
      fetchUsers(queryString.currentPage, queryString.per_page, searchQuery)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      fetchUsers, search, searchQuery, filteredUsers, pagesCount,
    } = this.props
    const queryString = getQueryString(search)
    if (filteredUsers.length < prevProps.filteredUsers.length && pagesCount > 1) {
      fetchUsers(queryString.currentPage, queryString.per_page, searchQuery)
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
      push({ pathname: '/users', search: `?page=${currentPage - 1}&per_page=${per_page}` })
    }
    deleteUser(id)
  }

  changePage = page => () => {
    const {
      push, searchQuery, fetchUsers, per_page,
    } = this.props
    fetchUsers(page, per_page, searchQuery)
    push({ pathname: '/users', search: `?page=${page}&per_page=${per_page}` })
  }

  render() {
    const {
      isLoading, filteredUsers, currentPage, searchQuery, pagesCount,
    } = this.props
    return (
      <Fragment>
        <h2 className={cx('headline')}>List of users</h2>
        <input
          className={cx('usersPage__search')}
          type='search'
          onChange={this.searchUsers}
          value={searchQuery}
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
          <tbody className={cx('usersPage__tbody')}>
            <tr className={cx('usersPage__firstTr')}>
              <td>
                {isLoading && <img src={preloaderIcon} alt='preloader' className={cx('usersPage__preloader')} />}
              </td>
            </tr>
            {filteredUsers.length > 0 && filteredUsers.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && !isLoading && <NoHaveUserRow />}
        {pagesCount > 1 && (
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
    fetchUsers, push, deleteUser,
  },
)(UsersPage)
