import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Pagination from 'material-ui-flat-pagination'
import styles from './ListUsersPage.scss'
// import { Pagination } from './Pagination/Pagination'
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
    const { users, perPage, page } = this.props
    const { activeDeleteRow } = this.state
    const visibleUserLength = users.length - (page * perPage) >= perPage ? perPage : users.length - (page * perPage)
    const visibleUser = []
    for (let i = 0; i < visibleUserLength; i += 1) {
      visibleUser.push(users[i + (page * perPage)])
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
        {/* {users.length > 7 && ( */}
        {/*  <Pagination */}
        {/*    activePage={activePage} */}
        {/*    pageList={users.length / 7} */}
        {/*    changeActivePage={this.changeActivePage} */}
        {/*  /> */}
        {/*  )} */}

        <Pagination
          limit={perPage}
          offset={page * perPage}
          total={users.length}
        />
      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  page: state.listUsers.page,
  perPage: state.listUsers.perPage,
  users: state.listUsers.users,
})

export default connect(
  mapStateToProps,
  { deleteUser },
)(ListUsersPage)
