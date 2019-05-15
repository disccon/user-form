import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Pagination.scss'

const cx = classNames.bind(styles)

export const Pagination = ({
  pagesCount, currentPage, limit, changePage,
}) => {
  const visiblePageListLength = pagesCount >= limit ? limit : pagesCount
  const visiblePageList = _.times(visiblePageListLength, Number)
  return (
    <div className={cx('listUsers__Pagination')}>
      <button
        disabled={currentPage === 1}
        type='button'
        className={cx('pagination__arrows', { pagination__activeTabs: currentPage !== 1 })}
        onClick={changePage('-1')}
      >
        {'<'}
      </button>
      {visiblePageList.map(page => (
        <button
          disabled={currentPage === page + 1}
          key={page + 1}
          type='button'
          className={cx('pagination__tabs', { pagination__activeTabs: currentPage === page + 1 })}
          onClick={changePage(page + 1)}
        >
          {page + 1}
        </button>
      ))}
      <button
        disabled={currentPage === pagesCount}
        type='button'
        className={cx('pagination__arrows', { pagination__activeTabs: currentPage !== pagesCount })}
        onClick={changePage('+1')}
      >
        {'>'}
      </button>
    </div>
  )
}

Pagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
}
