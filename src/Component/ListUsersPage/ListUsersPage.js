import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { push } from 'connected-react-router'
import classNames from 'classnames'
import styles from './ListUsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import db from '../../db'
import { deleteUser, userListerNewState } from '../../Actions'
import UserRow from './UserRow/UserRow'
import { userListGetIndexDB } from '../../helpers/userListGetIndexDB'
import Pagination from './Pagination/Pagination'

const cx = classNames.bind(styles)

class ListUsersPage extends Component {
  componentDidMount() {
    const { userListerNewState } = this.props
    userListGetIndexDB(userListerNewState)
  }

  deleteUser = idListUser => () => {
    const {
      deleteUser, currentPage, usersVisible, per_page,
    } = this.props
    db.listUserDB.delete(idListUser)
    deleteUser(idListUser, currentPage, usersVisible.length, per_page)
  }

  render() {
    const {
      usersVisible, pagesCount, currentPage, limit,
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
            <tr className={cx('listUsers__update')} />
            {usersVisible.length > 0 && usersVisible.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {usersVisible.length === 0 && <NoHaveUserRow />}
        {pagesCount > 1 && (
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            limit={limit}
          />
        )}
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  deleteUser: PropTypes.func.isRequired,
  usersVisible: PropTypes.array.isRequired,
  userListerNewState: PropTypes.func.isRequired,
  pagesCount: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
}

const mapStateToProps = (state, ownProps) => {
  const { users, lengthVisibleUser, limit } = state.listUsers
  const { search } = ownProps.location
  const valueQuery = queryString.parse(search)
  const { page } = valueQuery
  const NumberPage = Number(page)
  let usersVisible
  let per_page = lengthVisibleUser
  let currentPage = 1
  if (!search) {
    usersVisible = users.slice(0, lengthVisibleUser)
  } else {
    per_page = Number(valueQuery.per_page)
    currentPage = NumberPage
    usersVisible = users.slice((NumberPage - 1) * per_page, (NumberPage - 1) * per_page + per_page)
  }
  if (users.length > 0) {
    return {
      usersVisible,
      pagesCount: Math.ceil(users.length / per_page),
      currentPage,
      limit,
      per_page,
    }
  }
  return {
    usersVisible: [],
  }
}


export default connect(
  mapStateToProps,
  { deleteUser, push, userListerNewState },
)(ListUsersPage)
