import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import styles from './UsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import { fetchUsersDB, deleteUser, searchingUsers } from '../../Actions'
import UserRow from './UserRow/UserRow'
import { Pagination } from './Pagination/Pagination'
import { getFilterUsers } from './getFilterUsers'

const cx = classNames.bind(styles)

class UsersPage extends Component {
  componentDidMount() {
    const { fetchUsersDB } = this.props
    fetchUsersDB()
  }

  componentWillMount() {
    const {
      currentPage, total, per_page, push,
    } = this.props
    const pagesCount = Math.ceil(total / per_page)
    if (currentPage > pagesCount) {
      push({ pathname: '/users', search: `?page=${pagesCount}&per_page=${per_page}` })
    }
  }

  searchingUsersFilter = ({ target }) => {
    const { searchingUsers } = this.props
    const { value } = target
    searchingUsers(value)
  }

  deleteUser = id => () => {
    const {
      per_page, total, deleteUser, currentPage,
    } = this.props
    deleteUser(id, currentPage, total, per_page)
  }

  changePage = page => () => {
    const {
      per_page, push, fetchUsersDB,
    } = this.props
    push({ pathname: '/users', search: `?page=${page}&per_page=${per_page}` })
    fetchUsersDB(page, per_page)
  }

  render() {
    const {
      users, total, per_page, currentPage, filterUsers,
    } = this.props
    const pagesCount = Math.ceil(total / per_page)
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
            <tr className={cx('usersPage__trEmpty')} />
            {users.length > 0 && users.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {users.length === 0 && <NoHaveUserRow />}
        {pagesCount > 1 && (
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            changePage={this.changePage}
            limit={6}
          />
        )}
      </Fragment>
    )
  }
}

UsersPage.propTypes = {
  search: PropTypes.string,
  users: PropTypes.array.isRequired,
  per_page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  fetchUsersDB: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  searchingUsers: PropTypes.func.isRequired,
  filterUsers: PropTypes.string.isRequired,
  currentPage: PropTypes.number,
}

const mapStateToProps = state => {
  const { per_page, filterUsers } = state.usersReducer
  const userFilter = getFilterUsers(state)
  return {
    users: userFilter.users,
    total: userFilter.total,
    currentPage: userFilter.currentPage,
    per_page,
    filterUsers,
  }
}


export default connect(
  mapStateToProps,
  {
    fetchUsersDB, push, deleteUser, searchingUsers,
  },
)(UsersPage)