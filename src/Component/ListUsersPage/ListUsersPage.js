import React, { Component, Fragment } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Pagination from 'material-ui-flat-pagination'
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
  componentDidUpdate() {
    const { push, isLoading } = this.props
    if (isLoading === '/NodFound') {
      push(isLoading)
    }
  }

  deleteUser = idListUser => () => {
    const { deleteUser } = this.props
    db.listUserDB.delete(idListUser)
    deleteUser(idListUser)
  }

  changePage = (event, offset) => {
    const { perPage, push } = this.props
    push(`/ListUsers/${offset / perPage + 1}`)
  }

  render() {
    const {
      users, perPage, page, classes,
    } = this.props
    const visibleUser = users.slice((page * perPage), page * perPage + perPage)
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
            {users.length > 0 && visibleUser.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {users.length === 0 && <NoHaveUserRow />}
        <Pagination
          classes={classes}
          limit={perPage}
          offset={page * perPage}
          total={users.length}
          onClick={this.changePage}
        />
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  classes: PropTypes.object,
  perPage: PropTypes.number,
  page: PropTypes.number,
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  isLoading: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => {
  const page = ownProps.match.params.id - 1
  const { perPage, users } = state.listUsers
  if (users.length < perPage * page) {
    return {
      isLoading: '/NodFound',
      users: [],
    }
  }
  return {
    perPage,
    users,
    page,
  }
}

export default compose(
  connect(
    mapStateToProps,
    { deleteUser, push },
  ),
  withStyles(paginationStyles),
)(ListUsersPage)
