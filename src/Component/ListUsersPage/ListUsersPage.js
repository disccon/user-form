import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './ListUsersPage.scss'
import { Pagination } from './Pagination/Pagination'

import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import db from '../../db'
import { deleteUser } from '../../Actions'
import { UserRow } from './UserRow/UserRow'


const cx = classNames.bind(styles)

class ListUsersPage extends Component {
  state = {
    activePage: 0,
    activeDeleteRow: false,
  }

  changeActivePage = page => {
    this.setState({
      activePage: page,
    })
  }

  showRemoveUserButton = id => () => {
    this.setState({
      activeDeleteRow: id,
    })
  }

  deleteUser = idListUser => () => {
    const {
      deleteUser, users,
    } = this.props
    const { activePage } = this.state
    this.setState({
      activeDeleteRow: false,
    })
    if (users.length === 1) {
      this.setState({
        activePage: (activePage - 1),
      })
    }
    db.listUserDB.delete(idListUser)
    deleteUser(idListUser)
  }

  render() {
    const { users } = this.props
    const { activePage, activeDeleteRow } = this.state
    const visibleUserLength = users.length - (7 * activePage) >= 6 ? 6 : users.length - (7 * activePage)
    const visibleUser = []
    for (let i = 0; i < visibleUserLength; i += 1) {
      visibleUser.push(users[i + (7 * activePage)])
    }
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
                activeDeleteRow={activeDeleteRow}
                showRemoveUserButton={this.showRemoveUserButton}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {users.length === 0 && <NoHaveUserRow />}
        {users.length > 7 && (
          <Pagination
            activePage={activePage}
            pageList={users.length / 7}
            changeActivePage={this.changeActivePage}
          />
        )}
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.listUsers.users,
})

export default connect(
  mapStateToProps,
  { deleteUser },
)(ListUsersPage)
