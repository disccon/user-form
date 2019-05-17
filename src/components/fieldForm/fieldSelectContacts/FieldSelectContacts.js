import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'react-select'
import styles from './FieldSelectContacts.scss'

const cx = classNames.bind(styles)

const options = [
  { value: 'en', label: 'English, EN' },
  { value: 'fr', label: 'French, FR' },
  { value: 'es', label: 'Spanish, ES' },
  { value: 'ar', label: 'Arabic, AR' },
  { value: 'cmn', label: 'Mandarin, CMN' },
  { value: 'ru', label: 'Russian, RU' },
  { value: 'pt', label: 'Portuguese, PT' },
  { value: 'de', label: 'German, DE' },
  { value: 'ja', label: 'Japanese, JA' },
  { value: 'hi', label: 'Hindi, HI' },
  { value: 'ms', label: 'Malay, MS' },
  { value: 'fa', label: 'Persian, FA' },
  { value: 'sw', label: 'Swahili, SW' },
  { value: 'ta', label: 'Tamil, TA' },
  { value: 'it', label: 'Italian, IT' },
  { value: 'nl', label: 'Dutch, NL' },
  { value: 'bn', label: 'Bengali, BN' },
  { value: 'tr', label: 'Turkish, TR' },
  { value: 'vi', label: 'Vietnamese, VI' },
  { value: 'pl', label: 'Polish, PL' },
  { value: 'jv', label: 'Javanese, JV' },
  { value: 'pa', label: 'Punjabi, PA' },
  { value: 'th', label: 'Thai, TH' },
  { value: 'ko', label: 'Korean, KO' },
]

export const FieldSelectContacts = ({
  input, meta: { touched, error }, label,
}) => {
  const colourStyles = {
    control: styles => ({
      ...styles,
      width: '300px',
      height: '40px',
      backgroundColor: 'white',
      border: touched && error ? '1px solid #EB5757' : '1px solid #C1CFE0',
      borderRadius: '0px',
    }),
    indicatorsContainer: styles => ({
      ...styles,
      opacity: 0,
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
      height: '172px',
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
    <label className={cx('mainLanguage')}>
      <span className={cx('mainLanguage__Label')}>{label}</span>
      <Select
        {...input}
        onBlur={() => input.onBlur()}
        onChange={input.onChange}
        value={input.value}
        options={options}
        styles={colourStyles}
      />
      {touched && error && <p className={cx('mainLanguage__error')}>{error}</p>}
    </label>
  )
}

FieldSelectContacts.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  idField: PropTypes.string,
}
