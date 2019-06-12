import React from 'react'
import PropTypes from 'prop-types'
import Label from '../../../../../../components/Label/Label'
import '../FieldsFilterPopupBox.scss'

const InputLiFilterBox = ({
  id, nameInput, titleLabel, checked, setActiveInput, componentInput,
}) => (
  <li className='blockFilter__li' onChange={setActiveInput}>
    <input className='blockFilter__radioInput' type='radio' id={id} name={nameInput} defaultChecked={checked} />
    <Label htmlFor={id} className='blockFilter__label'>{titleLabel}</Label>
    {componentInput}
  </li>
)

InputLiFilterBox.propTypes = {
  id: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
  titleLabel: PropTypes.string.isRequired,
  componentInput: PropTypes.object,
  checked: PropTypes.bool,
  setActiveInput: PropTypes.func.isRequired,
}

export default InputLiFilterBox
