import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './ListUsersPage.scss'
import { Pagination } from './Pagination/Pagination'
import UserRow from './UserRow/UserRow'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'

const cx = classNames.bind(styles)

class ListUsersPage extends Component {
  state = {
    activePage: 0,
  }

  changeActivePage = page => {
    this.setState({
      activePage: page,
    })
  }

  render() {
    const { users, history } = this.props
    const { activePage } = this.state
    const visibleUserLength = users.length - (7 * activePage) >= 6 ? 6 : users.length - (7 * activePage)
    const visibleUser = []
    for (let i = 0; i < visibleUserLength; i += 1) {
      visibleUser.push(users[i + (7 * activePage)])
    }
    return (
      <Fragment>
        <h2 className={cx('ListUsersH2')}>List of users</h2>
        <table className={cx('ListUsersTable container')}>
          <thead>
            <tr>
              <th>name</th>
              <th>company</th>
              <th>contacts</th>
              <th>last update</th>
            </tr>
          </thead>
          <tbody>
            <tr />
            {users.length > 0
            && <UserRow users={visibleUser} activePage={activePage} changeActivePage={this.changeActivePage} history={history} />
            }
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
  history: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  users: state.listUsers.users,
})

export default connect(
  mapStateToProps,
)(ListUsersPage)
