import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import queryString from 'query-string'
import { push } from 'connected-react-router'
import styles from './UsersPage.scss'
import NoHaveUserRow from './noHaveUserRow/NoHaveUserRow'
import { fetchUsers, deleteUser, searchingUsers } from '../../actions/actionUsers'
import UserRow from './userRow/UserRow'
import { Pagination } from './pagination/Pagination'
import { getFilterUsers } from '../../helpers/getFilterUsers'
import { validateUsersUrl } from '../../helpers/validateUsersUrl'
import preloaderIcon from '../../img/icon/preloader.gif'

const cx = classNames.bind(styles)

class UsersPage extends Component {
  state = {
    listUsers: [],
    total: 0,
    currentPage: 1,
    preloader: true,
    perPage: 10,
  }

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

  componentDidUpdate(prevProps) {
    const {
      preloader, total, pagesCount, perPage,
    } = this.state
    const {
      users, filterUsers, search, push,
    } = this.props
    if ((prevProps.search !== search || prevProps.filterUsers !== filterUsers) && !preloader) {
      clearTimeout(this.interval)
      this.setState({
        preloader: true,
      })
    }
    if (prevProps.users !== users && total !== 0) {
      const valueQuery = queryString.parse(search)
      const per_page = Number(valueQuery.per_page) || perPage
      const newPagesCount = Math.ceil((total - 1) / per_page)
      const currentPage = Number(valueQuery.page) || 1
      if (pagesCount > newPagesCount && pagesCount !== 0 && currentPage === pagesCount) {
        push({ pathname: '/users', search: `?page=${newPagesCount}&per_page=${per_page}` })
      } else {
        this.getListUsers()
      }
    } else if (prevProps.search !== search || prevProps.filterUsers !== filterUsers || total === 0) {
      this.loadData()
    }
  }

  getListUsers = () => {
    const { search, filterUsers, users } = this.props
    const { perPage } = this.state
    const valueQuery = queryString.parse(search)
    const per_page = Number(valueQuery.per_page) || perPage
    const listUsers = getFilterUsers({
      users, filterUsers, per_page, search,
    })
    this.setState({
      listUsers: listUsers.users,
      total: listUsers.total,
      currentPage: listUsers.currentPage,
      pagesCount: listUsers.pagesCount,
      preloader: false,
    })
  }

  loadData = () => {
    this.interval = setTimeout(() => {
      this.getListUsers()
    }, 500)
  }

  searchingUsersFilter = ({ target }) => {
    const { searchingUsers } = this.props
    const { value } = target
    searchingUsers(value)
  }

  deleteUser = id => () => {
    const { deleteUser } = this.props
    deleteUser(id)
  }

  changePage = page => () => {
    const { push, search } = this.props
    const { perPage } = this.state
    const valueQuery = queryString.parse(search)
    const per_page = Number(valueQuery.per_page) || perPage
    push({ pathname: '/users', search: `?page=${page}&per_page=${per_page}` })
  }

  render() {
    const {
      preloader, listUsers, currentPage, filterUsers, pagesCount,
    } = this.state
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
            {listUsers.length > 0 && !preloader && listUsers.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {listUsers.length === 0 && !preloader && <NoHaveUserRow />}
        {pagesCount > 1 && !preloader && (
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            changePage={this.changePage}
            limit={5}
          />
        )}
        {preloader && <img src={preloaderIcon} alt='preloader' className={cx('usersPage__preloader')} />}
      </Fragment>
    )
  }
}

UsersPage.propTypes = {
  search: PropTypes.string,
  users: PropTypes.array.isRequired,
  filterUsers: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  searchingUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const { filterUsers, users } = state.usersReducer
  const { search } = state.router.location
  return {
    users,
    search,
    filterUsers,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchUsers, push, deleteUser, searchingUsers,
  },
)(UsersPage)
