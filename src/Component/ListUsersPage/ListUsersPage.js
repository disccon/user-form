import React, { Component, Fragment } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
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
  state = {
    users: [],
    page: null,
    limitPage: null,
  }

  componentDidMount() {
    const { push, search, lengthVisibleUser } = this.props
    const valueQuery = queryString.parse(search)
    const { page, per_page } = valueQuery
    console.log(valueQuery, page, per_page)
    db.listUserDB.toArray(users => {
      if (Number(page) > Number(per_page) || Math.ceil(users.length / lengthVisibleUser) !== Number(per_page)
        || !page || !per_page) {
        push('/NodFound')
      } else {
        this.setState({
          users,
          page: page - 1,
          limitPage: Number(per_page),
        })
      }
    })
  }

  componentDidUpdate() {
    const { push, search, lengthVisibleUser } = this.props
    const valueQuery = queryString.parse(search)
    const { page, per_page } = valueQuery
    db.listUserDB.toArray(users => {
      if (Number(page) > Number(per_page) || Math.ceil(users.length / lengthVisibleUser) !== Number(per_page)
        || !page || !per_page) {
        push('/NodFound')
      } else {
        this.setState({
          users,
          page: page - 1,
          limitPage: Number(per_page),
        })
      }
    })
  }

  deleteUser = idListUser => () => {
    const { deleteUser } = this.props
    db.listUserDB.delete(idListUser)
    deleteUser(idListUser)
  }

  changePage = (event, offset) => {
    const { lengthVisibleUser, push } = this.props
    const { limitPage } = this.state
    push({ pathname: '/ListUsers', search: `?page=${offset / lengthVisibleUser + 1}&per_page=${limitPage}` })
  }

  render() {
    const {
      lengthVisibleUser, classes,
    } = this.props
    const { users, page } = this.state
    const visibleUser = users.slice((page * lengthVisibleUser), page * lengthVisibleUser + lengthVisibleUser)
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
        {users.length > 1 && (
          <Pagination
            classes={classes}
            limit={lengthVisibleUser}
            offset={page * lengthVisibleUser}
            total={users.length}
            onClick={this.changePage}
          />
        )}
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  classes: PropTypes.object,
  perPage: PropTypes.number,
  // page: PropTypes.number,
  // users: PropTypes.array.isRequired,
  search: PropTypes.string,
  deleteUser: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  lengthVisibleUser: PropTypes.number.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  // const page = ownProps.match.params.id - 1
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
