import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import styles from './Pagination.scss'

const cx = classNames.bind(styles)

class Pagination extends Component {
  changePage = onClickButton => () => {
    const {
      push, lengthVisibleUser, currentPage, pagesCount,
    } = this.props
    if (onClickButton === 'back' && currentPage > 1) {
      push({ pathname: '/users', search: `?page=${currentPage - 1}&per_page=${lengthVisibleUser}` })
    } else if (onClickButton === 'forward' && currentPage !== pagesCount) {
      push({ pathname: '/users', search: `?page=${currentPage + 1}&per_page=${lengthVisibleUser}` })
    } else if (onClickButton > 0) {
      push({ pathname: '/users', search: `?page=${onClickButton}&per_page=${lengthVisibleUser}` })
    }
  }

  render() {
    const { pagesCount, currentPage, limit } = this.props
    const visiblePageListLength = pagesCount >= limit ? limit : pagesCount
    const visiblePageList = _.times(visiblePageListLength, Number)
    return (
      <div className={cx('listUsers__Pagination')}>
        <button
          type='button'
          className={cx('pagination__arrows', { pagination__activeTabs: currentPage !== 1 })}
          onClick={this.changePage(-1)}
        >
          {'<'}
        </button>
        {visiblePageList.map(page => (
          <button
            key={page + 1}
            type='button'
            className={cx('pagination__tabs', { pagination__activeTabs: currentPage === page + 1 })}
            onClick={this.changePage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          type='button'
          className={cx('pagination__arrows', { pagination__activeTabs: currentPage !== pagesCount })}
          onClick={this.changePage('forward')}
        >
          {'>'}
        </button>
      </div>
    )
  }
}

Pagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  lengthVisibleUser: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
  const { lengthVisibleUser } = state.listUsers
  return {
    lengthVisibleUser,
  }
}

export default connect(
  mapStateToProps,
  { push },
)(Pagination)
