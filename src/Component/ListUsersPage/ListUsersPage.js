import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import classNames from 'classnames'
import { push } from 'connected-react-router'
import styles from './ListUsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import db from '../../db'
import { usersListerState } from '../../Actions'
import UserRow from './UserRow/UserRow'
import { Pagination } from './Pagination/Pagination'
import { userListGetIndexDB } from '../../helpers/userListGetIndexDB'

const cx = classNames.bind(styles)

class ListUsersPage extends Component {
  componentDidMount() {
    const { usersListerState, perPage, currentPage } = this.props
    const start = (currentPage - 1) * perPage
    userListGetIndexDB(usersListerState, start, start + perPage)
  }

  deleteUser = id => () => {
    const {
      currentPage, perPage, usersLength, push, usersListerState,
    } = this.props
    let newCurrentPage = currentPage
    db.listUserDB.delete(id)
      .then(() => {
        if (((currentPage - 1) * perPage + 1) >= usersLength && currentPage > 1) {
          newCurrentPage = currentPage - 1
          push({ pathname: '/users', search: `?page=${currentPage - 1}&per-page=${perPage}` })
        }
        const start = (newCurrentPage - 1) * perPage
        userListGetIndexDB(usersListerState, start, start + perPage)
      })
  }

  changePage = onClickButton => () => {
    const {
      currentPage, perPage, usersListerState, push,
    } = this.props
    let newCurrentPage
    if (onClickButton === '+1') {
      newCurrentPage = currentPage + 1
    } else if (onClickButton === '-1') {
      newCurrentPage = currentPage - 1
    } else {
      newCurrentPage = onClickButton
    }
    push({ pathname: '/users', search: `?page=${newCurrentPage}&per-page=${perPage}` })
    const start = (newCurrentPage - 1) * perPage
    userListGetIndexDB(usersListerState, start, start + perPage)
  }

  render() {
    const {
      users, pagesCount, currentPage,
    } = this.props
    return (
      <Fragment>
        <h2 className={cx('headline')}>List of users</h2>
        <table className={cx('listUsersTable container')}>
          <thead className={cx('listUsers__thead')}>
            <tr className={cx('listUsers__tr')}>
              <th className={cx('listUsers__name')}>name</th>
              <th className={cx('listUsers__company')}>company</th>
              <th className={cx('listUsers__contacts')}>contacts</th>
              <th className={cx('listUsers__update')}>last update</th>
            </tr>
          </thead>
          <tbody>
            <tr className={cx('listUsers__trEmpty')} />
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

ListUsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  perPage: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  usersLength: PropTypes.number.isRequired,
  usersListerState: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { users, perPage, usersLength } = state.listUsers
  const { search } = state.router.location
  const pagesCount = Math.ceil(usersLength / perPage)
  let currentPage = 1
  if (search) {
    const valueQuery = queryString.parse(search)
    currentPage = Number(valueQuery.page)
  }
  return {
    users,
    usersLength,
    pagesCount,
    currentPage,
    perPage,
  }
}


export default connect(
  mapStateToProps,
  { usersListerState, push },
)(ListUsersPage)
