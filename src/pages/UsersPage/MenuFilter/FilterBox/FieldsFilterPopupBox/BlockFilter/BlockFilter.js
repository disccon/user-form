import React, { Component, Fragment } from 'react'
import cn from 'classnames'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../FieldsFilterPopupBox.scss'
import InputLiFilterBox from '../InputLiFilterBox/InputLiFilterBox'
import { applyFilterUsers } from '../../../../../../actions/actionUsers'

const arrInputLi = [{ titleLabel: 'is' }, { titleLabel: 'start with' }, { titleLabel: 'ends with' },
  { titleLabel: 'contains' }, { titleLabel: 'does not contains' }]

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
          {arrInputLi.map((input, index) => (
            <InputLiFilterBox
              key={index}
              setActiveInput={this.setActiveInput(input.titleLabel)}
              id={`input${nameFilter}${index}`}
              nameInput={nameFilter}
              titleLabel={input.titleLabel}
              valueInput={valueInput}
              checked={index === 0}
              componentInput={componentInput}
            />
          ))}
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
