import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cn from 'classnames'
import '../FieldsFilterPopupBox.scss'
import FilterSelect from './FilterSelect/FilterSelect'
import InputLiFilterBox from '../InputLiFilterBox/InputLiFilterBox'
import { applyFilterUsers } from '../../../../../../actions/actionUsers'

class SkillsFilter extends Component {
  state = {
    valueInput: '',
    activeInput: 'is',
  }

  onChangeValue = event => {
    this.setState({
      valueInput: event,
    })
  }

  applyFilter = () => {
    const { applyFilterUsers, nameFilter } = this.props
    const { valueInput, activeInput } = this.state
    applyFilterUsers('applyFilter', nameFilter, valueInput, activeInput)
  }

  setActiveInput = input => () => {
    this.setState({
      activeInput: input,
    })
  }

  render() {
    const { nameFilter } = this.props
    const { valueInput, activeInput } = this.state
    return (
      <Fragment>
        <ul className='fieldsFilterPopupBox__ul'>
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('is')}
            valueInput={valueInput}
            id={`input${nameFilter}1`}
            nameInput={nameFilter}
            checked
            titleLabel='is'
            componentInput={(
              <div className='blockFilter__wrapperFilterSelect'>
                <FilterSelect valueInput={valueInput} onChangeValue={this.onChangeValue} />
              </div>
            )}
          />
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('is not')}
            valueInput={valueInput}
            id={`input${nameFilter}2`}
            nameInput={nameFilter}
            titleLabel='is not'
            componentInput={(
              <div className='blockFilter__wrapperFilterSelect'>
                <FilterSelect valueInput={valueInput} onChangeValue={this.onChangeValue} />
              </div>
            )}
          />
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('has any value')}
            valueInput={valueInput}
            id={`input${nameFilter}3`}
            nameInput={nameFilter}
            titleLabel='has any value'
          />
        </ul>
        <button
          className={cn('fieldsFilterPopupBox__done',
            { fieldsFilterPopupBox__doneDisabled: valueInput === '' && activeInput !== 'has any value' })}
          type='button'
          onClick={this.applyFilter}
          disabled={valueInput === '' && activeInput !== 'has any value'}
        >
          Done
        </button>
      </Fragment>
    )
  }
}

SkillsFilter.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  applyFilterUsers: PropTypes.func.isRequired,
}

export default connect(
  null,
  { applyFilterUsers },
)(SkillsFilter)
