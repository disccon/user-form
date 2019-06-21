import React, { Component, Fragment } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../FieldsFilterPopupBox.scss'
import InputLiFilterBox from '../InputLiFilterBox/InputLiFilterBox'
import { applyFilterUsers } from '../../../../../../actions/actionUsers'

class BlockFilter extends Component {
  state = {
    valueInput: '',
    activeInput: 'is',
  }

  onChangeValue = ({ target }) => {
    const { value } = target
    this.setState({
      valueInput: value,
    })
  }

  applyFilter = () => {
    const { valueInput, activeInput } = this.state
    const { applyFilterUsers, nameFilter } = this.props
    applyFilterUsers('applyFilter', nameFilter, valueInput, activeInput)
  }

  setActiveInput = input => () => {
    this.setState({
      activeInput: input,
    })
  }

  render() {
    const { nameFilter } = this.props
    const { valueInput } = this.state
    const componentInput = (
      <input
        className='blockFilter__searchFilter'
        placeholder='Name user'
        type='text'
        onChange={this.onChangeValue}
        value={valueInput}
      />
    )
    return (
      <Fragment>
        <ul className='fieldsFilterPopupBox__ul'>
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('is')}
            id={`input${nameFilter}1`}
            nameInput={nameFilter}
            titleLabel='is'
            valueInput={valueInput}
            checked
            componentInput={componentInput}
          />
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('start with')}
            id={`input${nameFilter}2`}
            nameInput={nameFilter}
            titleLabel='start with'
            valueInput={valueInput}
            componentInput={componentInput}
          />
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('ends with')}
            id={`input${nameFilter}3`}
            nameInput={nameFilter}
            titleLabel='ends with'
            valueInput={valueInput}
            componentInput={componentInput}
          />
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('contains')}
            id={`input${nameFilter}4`}
            nameInput={nameFilter}
            titleLabel='contains'
            valueInput={valueInput}
            componentInput={componentInput}
          />
          <InputLiFilterBox
            setActiveInput={this.setActiveInput('not contains')}
            id={`input${nameFilter}5`}
            nameInput={nameFilter}
            titleLabel='does not contains'
            valueInput={valueInput}
            componentInput={componentInput}
          />
        </ul>
        <button
          className={cn('fieldsFilterPopupBox__done', { fieldsFilterPopupBox__doneDisabled: valueInput === '' })}
          type='button'
          onClick={this.applyFilter}
          disabled={valueInput === ''}
        >
          Done
        </button>
      </Fragment>
    )
  }
}

BlockFilter.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  applyFilterUsers: PropTypes.func.isRequired,
}

export default connect(
  null,
  { applyFilterUsers },
)(BlockFilter)
