import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const options = [
  { value: 'CSS', label: 'CSS' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'React', label: 'React' },
  { value: 'Angular', label: 'Angular' },
  { value: 'jQuery', label: 'jQuery' },
  { value: 'NodeJS', label: 'NodeJS' },
  { value: 'Python', label: 'Python' },
  { value: 'PHP', label: 'PHP' },
]

const FilterSelect = ({ valueInput, onChangeValue }) => {
  const colourStyles = {
    control: styles => ({
      ...styles,
      marginTop: '5px',
      marginLeft: '30px',
      width: '232px',
      height: '38px',
      backgroundColor: 'white',
      borderRadius: '5px',
    }),
    indicatorsContainer: styles => ({
      ...styles,
      opacity: 0,
    }),
    container: styles => ({
      ...styles,
      color: '#000000',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '14px',
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
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '14px',
      backgroundColor: 'white',
      color: '#000000',
    }),
    placeholder: styles => ({
      ...styles,
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '14px',
      color: '#737373',
    }),
    singleValue: styles => ({
      ...styles,
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '14px',
      color: '#000000',
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? '#ff5e31'
          : isFocused
            ? '#ff825e'
            : null,
    }),
  }
  return (
    <Select
      onChange={onChangeValue}
      value={valueInput}
      options={options}
      styles={colourStyles}
    />
  )
}

FilterSelect.propTypes = {
  valueInput: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onChangeValue: PropTypes.func.isRequired,
}

export default FilterSelect
