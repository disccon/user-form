import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as CloseIcon } from '../../../../img/icon/close.svg'
import styles from './QuestionAccount.scss'

const cx = classNames.bind(styles)

const QuestionAccount = ({ continueUser }) => (
  <div className={cx('accountComponentQuestion')}>
    <span className={cx('accountComponentQuestion__span')}>
            You have an unsaved user data. Do you want to complete it?
    </span>
    <button
      type='button'
      className={cx('accountComponentQuestion__continue')}
      onClick={continueUser(true)}
    >
      Continue
    </button>
    <button
      type='button'
      className={cx('accountComponentQuestion__close')}
      onClick={continueUser(false)}
    >
      <CloseIcon className={cx('accountComponentQuestion__closeIcon')} alt='closeIcon' />
    </button>
  </div>
)

QuestionAccount.propTypes = {
  continueUser: PropTypes.func.isRequired,
}

export default QuestionAccount
