import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import classNames from 'classnames'
import styles from './FieldSelectCapabilities.scss'

const cx = classNames.bind(styles)

const options = [
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'React', label: 'React' },
  { value: 'Angular', label: 'Angular' },
  { value: 'jQuery', label: 'jQuery' },
  { value: 'NodeJS', label: 'NodeJS' },
  { value: 'Python', label: 'Python' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Ruby On Rails', label: 'Ruby On Rails' },
  { value: 'SQL', label: 'SQL' },
  { value: 'BackboneJS', label: 'BackboneJS' },
  { value: 'Web Design', label: 'Web Design' },
  { value: 'Project management', label: 'Project management' },
  { value: 'Git', label: 'Git' },
  { value: 'Docker', label: 'Docker' },
  { value: 'AWS Lambda', label: 'AWS Lambda' },
  { value: 'Firebase', label: 'Firebase' },
]

export const FieldSelectCapabilities = ({
  label, input, meta: { touched, error },
}) => {
  const colourStyles = {
    multiValueRemove: styles => ({
      ...styles,
      backgroundColor: '#E7F0FF',
      ':hover': {
        backgroundColor: '#4E86E4',
        color: 'white',
      },
    }),
    multiValueLabel: styles => ({
      ...styles,
      backgroundColor: '#E7F0FF',
      color: '#9BB0CB',
    }),
    control: styles => ({
      ...styles,
      width: '300px',
      minHeight: '40px',
      backgroundColor: 'white',
      border: touched && error ? '1px solid #EB5757' : '1px solid #C1CFE0',
      borderRadius: '0px',
    }),
    indicatorSeparator: styles => ({
      ...styles,
      backgroundColor: 'white',
    }),
    clearIndicator: styles => ({
      ...styles,
      position: 'absolute',
      right: '-37px',
    }),
    container: styles => ({
      ...styles,
      color: '#657C9A',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 'normal',
      fontStyle: 'normal',
    }),
    menuList: styles => ({
      ...styles,
      height: '132px',
    }),
    menu: styles => ({
      ...styles,
      borderRadius: '0px',
    }),
    input: styles => ({
      ...styles,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: 'normal',
      fontStyle: 'normal',
      color: '#000000',
    }),
    placeholder: styles => ({
      ...styles,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 'normal',
      fontStyle: 'normal',
      color: '#657C9A',
    }),
    singleValue: styles => ({
      ...styles,
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: 'normal',
      fontStyle: 'normal',
      color: '#000000',
    }),
  }
  return (
    <label className={cx('selectCapabilities')}>
      <span className={cx('selectCapabilities__label')}>{label}</span>
      <Select
        {...input}
        onBlur={() => input.onBlur()}
        onChange={input.onChange}
        value={input.value}
        isMulti
        options={options}
        styles={colourStyles}
        className='basic-multi-select'
      />
      {touched && error && <p className={cx('selectCapabilities__pError')}>{error}</p>}
    </label>
  )
}

FieldSelectCapabilities.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}
