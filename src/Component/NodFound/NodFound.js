import React from 'react'
import classNames from 'classnames'
import styles from './NodFound.scss'

const cx = classNames.bind(styles)

export const NodFound = () => (
  <h1 className={cx('nodFound')}>NodFound 404!</h1>
)
