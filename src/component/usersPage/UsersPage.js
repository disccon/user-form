import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { createSelector } from 'reselect'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import styles from './UsersPage.scss'
import NoHaveUserRow from './noHaveUserRow/NoHaveUserRow'
import { fetchUsersDB, deleteUser } from '../../actions'
import UserRow from './userRow/UserRow'
import { Pagination } from './pagination/Pagination'
import db from '../../db'


const cx = classNames.bind(styles)

class UsersPage extends Component {
  state = {
    searchInput: 'dsds',
  }

  componentDidMount() {
    const { per_page, fetchUsersDB } = this.props
    const currentPage = this.queryStringPage()
    fetchUsersDB(currentPage, per_page)
  }

  searchingUsers = ({ target }) => {
    const { fetchUsersDB, per_page } = this.props
    const { value } = target
    db.usersDB.toArray(usersDB => {
      const userFilter = usersDB.filter(user => `${user.firstName} ${user.lastName}`.includes(value))
      const currentPage = this.queryStringPage()
      const start = (currentPage - 1) * per_page
      fetchUsersDB(userFilter.slice(start, start + per_page), userFilter.length)
    })
    this.setState({
      searchInput: target.value,
    })
  }

  queryStringPage = () => {
    const { search } = this.props
    const valueQuery = queryString.parse(search)
    const currentPage = Number(valueQuery.page) || 1
    return currentPage
  }

  deleteUser = id => () => {
    const {
      per_page, total, deleteUser,
    } = this.props
    const currentPage = this.queryStringPage()
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
    const { users, total, per_page } = this.props
    const pagesCount = Math.ceil(total / per_page)
    const currentPage = this.queryStringPage()
    return (
      <Fragment>
        <h2 className={cx('headline')}>List of users</h2>
        <input
          className={cx('usersPage__search')}
          type='search'
          onChange={this.searchingUsers}
          value={this.state.searchInput}
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
  search: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  per_page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  fetchUsersDB: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { users, per_page, total, filterFullName } = state.usersReducer
  const { search } = state.router.location
  const selectorUsers = createSelector(
    users,
    filterFullName,
    (usersAll, fullName) => usersAll.filter(user => `${user.firstName} ${user.lastName}`.includes(fullName))
  )
  console.log(selectorUsers)
  return {
    users,
    total,
    search,
    per_page,
  }
}


export default connect(
  mapStateToProps,
  { fetchUsersDB, push, deleteUser },
)(UsersPage)
