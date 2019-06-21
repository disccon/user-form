import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as CloseIcon } from '../../../../img/icon/close.svg'
import './QuestionAccount.scss'

const QuestionAccount = ({ continueUser }) => (
  <div className='accountComponentQuestion'>
    <span className='accountComponentQuestion__span'>
            You have an unsaved user data. Do you want to complete it?
    </span>
    <button
      type='button'
      className='accountComponentQuestion__continue'
      onClick={continueUser(true)}
    >
      Continue
    </button>
    <button
      type='button'
      className='accountComponentQuestion__close'
      onClick={continueUser(false)}
    >
      <CloseIcon className='accountComponentQuestion__closeIcon' alt='closeIcon' />
    </button>
  </div>
)

QuestionAccount.propTypes = {
  continueUser: PropTypes.func.isRequired,
}

export default QuestionAccount
