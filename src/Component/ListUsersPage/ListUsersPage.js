import React, { Component, Fragment } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { push } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Pagination from 'material-ui-flat-pagination'
import _ from 'lodash/core'
import styles from './ListUsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import db from '../../db'
import { deleteUser } from '../../Actions'
import UserRow from './UserRow/UserRow'

const cx = classNames.bind(styles)

const paginationStyles = {
  root: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
  },
  rootCurrent: {
    color: '#3f51b5',
  },
  rootStandard: {
    color: '#030202',
  },
  text: {
    fontSize: '18px',
  },
}

class ListUsersPage extends Component {
  state = {
    users: [],
    lengthPage: null,
  }

  componentDidMount() {
    const { push, search } = this.props
    if (!search) {
      db.listUserDB.toArray(users => {
        this.setState({
          users: users.slice(0, 10),
          lengthPage: users.length,
        })
        push({ pathname: '/ListUsers', search: '?page=1&per_page=10' })
      })
    }
  }

  componentDidUpdate() {
    const { search } = this.props
    const { users } = this.state
    const valueQuery = queryString.parse(search)
    const { page, per_page } = valueQuery
    const pageNumber = Number(page)
    const per_pageNumber = Number(per_page)
    db.listUserDB.toArray(usersDB => {
      const newUsers = usersDB.slice((pageNumber - 1) * per_pageNumber, (pageNumber - 1)
          * per_pageNumber + per_pageNumber)
      if (!_.isEqual(newUsers, users)) {
        this.setState({
          users: newUsers,
          lengthPage: usersDB.length,
        })
      }
    })
  }

  deleteUser = idListUser => () => {
    const { push, search } = this.props
    const valueQuery = queryString.parse(search)
    const { page, per_page } = valueQuery
    const pageNumber = Number(page)
    const per_pageNumber = Number(per_page)
    db.listUserDB.delete(idListUser)
    db.listUserDB.toArray(usersDB => {
      if (usersDB.length + per_pageNumber === pageNumber * per_pageNumber) {
        push({
          pathname: '/ListUsers',
          search: `?page=${page - 1}&per_page=${per_page}`,
        })
      } else {
        this.setState({
          users: usersDB.slice((pageNumber - 1) * per_pageNumber, (pageNumber - 1) * per_pageNumber + per_pageNumber),
          lengthPage: usersDB.length,
        })
      }
    })
  }

  changePage = (event, offset) => {
    const { push, search } = this.props
    const valueQuery = queryString.parse(search)
    const { per_page } = valueQuery
    push({
      pathname: '/ListUsers',
      search: `?page=${offset / per_page + 1}&per_page=${per_page}`,
    })
  }

  render() {
    const { classes, search } = this.props
    const { users, lengthPage } = this.state
    const valueQuery = queryString.parse(search)
    const { page, per_page } = valueQuery
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
        {users.length !== 0 && (
          <Pagination
            classes={classes}
            limit={per_page}
            offset={per_page * (page - 1)}
            total={lengthPage}
            onClick={this.changePage}
          />
        )}
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  classes: PropTypes.object,
  search: PropTypes.string,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const { lengthVisibleUser } = state.listUsers
  const { search } = ownProps.location
  return {
    lengthVisibleUser,
    search,
  }
}

export default compose(
  connect(
    mapStateToProps,
    { deleteUser, push },
  ),
  withStyles(paginationStyles),
)(ListUsersPage)
