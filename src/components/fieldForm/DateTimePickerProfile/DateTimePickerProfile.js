import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import DatePicker from 'react-date-picker'
import './DateTimePickerProfile.scss'
import { ReactComponent as CalendarIcon } from '../../../img/icon/calendar.svg'

const DateTimePickerProfile = ({ input, meta: { touched, error } }) => (
  <Fragment>
    <div className='profile__birthDate'>
      <div className='profile__birthDateWrapper'>
        <span className='profile__birthDateLabel'>Birth date</span>
        <span className='profile__birthDateSpan'>*</span>
      </div>
      <DatePicker
        format='dd/MM/yyyy'
        clearIcon=''
        calendarIcon={<CalendarIcon />}
        className={cn('profile__datePicker', { profile__datePickerError: touched && error })}
        isOpen
        placeholder='DD/MM/YYYY'
        locale='en'
        {...input}
        onBlur={() => input.onBlur()}
        onChange={input.onChange}
        value={input.value}
        calendarClassName='profile__react-calendar'
      />
      {touched && error && <p className='birthDate__error'>{error}</p>}
    </div>
  </Fragment>
)

DateTimePickerProfile.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

export default DateTimePickerProfile
