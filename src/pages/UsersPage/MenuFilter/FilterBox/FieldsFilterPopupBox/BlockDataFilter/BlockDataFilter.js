import React, { Component, Fragment } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DayPicker from 'react-day-picker'
import '../FieldsFilterPopupBox.scss'
import InputLiFilterBox from '../InputLiFilterBox/InputLiFilterBox'
import { applyFilterUsers } from '../../../../../../actions/actionUsers'

class BlockDataFilter extends Component {
  state = {
    valueInput: '',
    activeInput: 'more than',
    selectedDay: new Date(),
  }

  onChangeValue = ({ target }) => {
    const { value } = target
    if (/^\d+$/.test(value) || value === '') {
      this.setState({
        valueInput: value,
      })
    }
  }

  applyFilter = () => {
    const { applyFilterUsers, nameFilter } = this.props
    const { valueInput, activeInput, selectedDay } = this.state
    let newValueInput
    if (activeInput === 'more than' || activeInput === 'exactly' || activeInput === 'less than') {
      newValueInput = valueInput
    } else {
      newValueInput = selectedDay
    }
    applyFilterUsers('applyFilter', nameFilter, newValueInput, activeInput)
  }

  setActiveInput = input => () => {
    this.setState({
      activeInput: input,
    })
  }

  changeStateSelectedDay = (day, { selected }) => {
    this.setState({
      selectedDay: selected ? undefined : day,
    })
  }

  render() {
    const { nameFilter } = this.props
    const { valueInput, selectedDay, activeInput } = this.state
    const componentInput = (
      <div className='blockDataFilter__wrapperInput'>
        <input
          className='blockDataFilter__daysInput'
          type='text'
          onChange={this.onChangeValue}
          value={valueInput}
        />
        <span className='blockDataFilter__daysSpan'>Days ago</span>
      </div>
    )
    const componentDayPicker = (
      <DayPicker
        className='dayPickerBox'
        selectedDays={selectedDay}
        onDayClick={this.changeStateSelectedDay}
      />
    )
    return (
      <Fragment>
        <div className='fieldsFilterPopupBox__wrapper'>
          <h4 className='fieldsFilterPopupBox__h4'>Relative:</h4>
          <ul className='blockDataFilter__fistUl'>
            <InputLiFilterBox
              setActiveInput={this.setActiveInput('more than')}
              id={`input${nameFilter}1`}
              nameInput={nameFilter}
              titleLabel='More than'
              valueInput={valueInput}
              componentInput={componentInput}
              checked
            />
            <InputLiFilterBox
              setActiveInput={this.setActiveInput('exactly')}
              id={`input${nameFilter}2`}
              nameInput={nameFilter}
              titleLabel='Exactly'
              valueInput={valueInput}
              componentInput={componentInput}
            />
            <InputLiFilterBox
              setActiveInput={this.setActiveInput('less than')}
              id={`input${nameFilter}3`}
              nameInput={nameFilter}
              titleLabel='Less than'
              valueInput={valueInput}
              componentInput={componentInput}
            />
          </ul>
          <h4 className='fieldsFilterPopupBox__h4'>Absolute:</h4>
          <ul className='blockDataFilter__secondUl'>
            <InputLiFilterBox
              setActiveInput={this.setActiveInput('after')}
              nameInput={nameFilter}
              id={`inputDate${nameFilter}1`}
              titleLabel='After'
              componentInput={componentDayPicker}
            />
            <InputLiFilterBox
              setActiveInput={this.setActiveInput('on')}
              nameInput={nameFilter}
              id={`inputDate${nameFilter}2`}
              titleLabel='On'
              componentInput={componentDayPicker}
            />
            <InputLiFilterBox
              setActiveInput={this.setActiveInput('before')}
              nameInput={nameFilter}
              id={`inputDate${nameFilter}3`}
              titleLabel='Before'
              componentInput={componentDayPicker}
            />
          </ul>
        </div>
        <button
          className={cn('fieldsFilterPopupBox__done',
            {
              fieldsFilterPopupBox__doneDisabled: valueInput === '' && activeInput !== 'after'
                && activeInput !== 'on' && activeInput !== 'before',
            })}
          type='button'
          onClick={this.applyFilter}
          disabled={valueInput === '' && activeInput !== 'after'
          && activeInput !== 'on' && activeInput !== 'before'}
        >
          Done
        </button>
      </Fragment>
    )
  }
}

BlockDataFilter.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  applyFilterUsers: PropTypes.func.isRequired,
}

export default connect(
  null,
  { applyFilterUsers },
)(BlockDataFilter)
