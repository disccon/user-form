import React, { Component, Fragment } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Pagination from 'material-ui-flat-pagination'
import styles from './ListUsersPage.scss'
import NoHaveUserRow from './NoHaveUserRow/NoHaveUserRow'
import db from '../../db'
import { deleteUser } from '../../Actions'
import { UserRow } from './UserRow/UserRow'


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
    activePage: 0,
    activeDeleteRow: false,
  }

  componentDidMount() {

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

  changePage = (event, offset) => {
    const { perPage, page } = this.props
  }

  render() {
    const {
      users, perPage, page, classes,
    } = this.props
    const { activeDeleteRow } = this.state
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
                activeDeleteRow={activeDeleteRow}
                showRemoveUserButton={this.showRemoveUserButton}
                deleteUser={this.deleteUser}
              />
            ))}
          </tbody>
        </table>
        {users.length === 0 && <NoHaveUserRow />}
        <Pagination
          classes={classes}
          limit={2}
          offset={page * perPage}
          total={users.length}
          onClick={this.changePage}
        />

      </Fragment>
    )
  }
}

ListUsersPage.propTypes = {
  classes: PropTypes.object.isRequired,
  perPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  page: state.listUsers.page,
  perPage: state.listUsers.perPage,
  users: state.listUsers.users,
})

export default compose(
  connect(
    mapStateToProps,
    { deleteUser },
  ),
  withStyles(paginationStyles),
)(ListUsersPage)
