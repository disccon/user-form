import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import styles from './UsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import { fetchUsersDB, deleteUser } from '../../Actions'
import UserRow from './UserRow/UserRow'
import { Pagination } from './Pagination/Pagination'
import db from '../../db'

const cx = classNames.bind(styles)

class UsersPage extends Component {
  componentDidMount() {
    const { perPage } = this.props
    const currentPage = this.queryStringPage()
    this.fetchUsers(currentPage, perPage)
  }

  fetchUsers = (currentPage, perPage) => {
    const start = (currentPage - 1) * perPage
    const { fetchUsersDB } = this.props
    db.usersDB.toArray(usersDB => {
      fetchUsersDB(usersDB.slice(start, start + perPage), usersDB.length)
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
      perPage, total, deleteUser,
    } = this.props
    const currentPage = this.queryStringPage()
    deleteUser(id, currentPage, total, perPage)
  }

  changePage = pageId => () => {
    const {
      perPage, push,
    } = this.props
    push({ pathname: '/users', search: `?page=${pageId}&per-page=${perPage}` })
    this.fetchUsers(pageId, perPage)
  }

  render() {
    const { users, total, perPage } = this.props
    const currentPage = this.queryStringPage()
    const pagesCount = Math.ceil(total / perPage)
    return (
      <Fragment>
        <h2 className={cx('headline')}>List of users</h2>
        <input className={cx('usersPage__search')} type='search' />
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
  perPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  fetchUsersDB: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { users, perPage, total } = state.usersReducer
  const { search } = state.router.location
  return {
    users,
    total,
    search,
    perPage,
  }
}


export default connect(
  mapStateToProps,
  { fetchUsersDB, push, deleteUser },
)(UsersPage)
