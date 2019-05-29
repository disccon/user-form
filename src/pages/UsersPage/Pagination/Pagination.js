import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Pagination.scss'

const cx = classNames.bind(styles)

export const Pagination = ({
  pagesCount, currentPage, limit, changePage,
}) => {
  const indentLimit = Math.floor(limit / 2)
  const indentPage = (pagesCount - currentPage) >= indentLimit ? indentLimit
    : limit - 1 - (pagesCount - currentPage)
  return (
    <div className={cx('usersPage__pagination')}>
      <button
        disabled={currentPage === 1}
        type='button'
        className={cx('pagination__arrows', { pagination__activeTabs: currentPage !== 1 })}
        onClick={changePage(currentPage - 1)}
      >
        {'<'}
      </button>
      {currentPage > indentLimit + 1 && pagesCount > limit && (
      <button
        type='button'
        className={cx('pagination__points')}
        onClick={changePage(1)}
      >
        ...
      </button>
      )}
      {_.times(Math.min(limit, pagesCount), page => {
        const nowPage = currentPage > indentPage ? page + currentPage - indentPage : page + 1
        return (
          <button
            disabled={currentPage === nowPage}
            key={nowPage}
            type='button'
            className={cx('pagination__tabs', { pagination__activeTabs: currentPage === nowPage })}
            onClick={changePage(nowPage)}
          >
            {nowPage}
          </button>
        )
      })}
      {currentPage < pagesCount - indentLimit && pagesCount > limit && (
      <button
        disabled={currentPage === pagesCount}
        type='button'
        className={cx('pagination__points')}
        onClick={changePage(pagesCount)}
      >
        ...
      </button>
      )}
      <button
        disabled={currentPage === pagesCount}
        type='button'
        className={cx('pagination__arrows', { pagination__activeTabs: currentPage !== pagesCount })}
        onClick={changePage(currentPage + 1)}
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
