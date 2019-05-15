import React from 'react'
import classNames from 'classnames'
import styles from './NotFound.scss'

const cx = classNames.bind(styles)

export const NotFound = () => (
  <h1 className={cx('nodFound')}>NodFound 404!</h1>
)
