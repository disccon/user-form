import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from '../ListUsersPage.scss'


const cx = classNames.bind(styles)

export class Pagination extends Component {
  changeActivePage = page => () => {
    const { changeActivePage } = this.props
    changeActivePage(page)
  }

  render() {
    const { pageList, activePage } = this.props
    const visiblePageListLength = pageList >= 6 ? 6 : pageList
    const visiblePageList = []
    for (let i = 0; i < visiblePageListLength; i += 1) {
      visiblePageList.push(i)
    }

    return (
      <div className={cx('ListUsers__Pagination')}>
        {visiblePageList.map(page => (
          <button
            key={page}
            type='button'
            className={cx({ pagination__active: activePage === page })}
            onClick={this.changeActivePage(page)}
          >
            {1 + page}
          </button>
        ))}
      </div>
    )
  }
}

Pagination.propTypes = {
  changeActivePage: PropTypes.func.isRequired,
  pageList: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
}
