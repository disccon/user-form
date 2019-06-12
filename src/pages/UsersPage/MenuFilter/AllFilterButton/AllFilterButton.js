import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import cn from 'classnames'
import { ReactComponent as FilterIcon } from '../../../../img/icon/filter.svg'
import { ReactComponent as CheckIcon } from '../../../../img/icon/check.svg'
import './AllFilterButton.scss'
import FieldsFilterPopupBox from '../FilterBox/FieldsFilterPopupBox/FieldsFilterPopupBox'
import { applyFilterUsers } from '../../../../actions/actionUsers'

class AllFilterButtonOutside extends Component {
  state = {
    isButtonAllFilters: false,
  }

  handleClickOutside = () => {
    const { isButtonAllFilters } = this.state
    if (isButtonAllFilters) {
      this.openButtonAllFilters()
    }
  }

  openButtonAllFilters = () => {
    this.setState(state => ({
      isButtonAllFilters: !state.isButtonAllFilters,
    }))
  }

  changeEventMatchFilters = value => () => {
    const { eventMatchAllFilters, applyFilterUsers } = this.props
    if (value === 'all' && eventMatchAllFilters === 'any') {
      this.setState({
        isButtonAllFilters: false,
      })
      applyFilterUsers('changeEventMatchFilters', 'all')
    }
    if (value === 'any' && eventMatchAllFilters === 'all') {
      this.setState({
        isButtonAllFilters: false,
      })
      applyFilterUsers('changeEventMatchFilters', 'any')
    }
  }

  render() {
    const { eventClass, eventMatchAllFilters } = this.props
    const { isButtonAllFilters } = this.state
    return (
      <div className='allFilterButton menuFilter__filterBox'>
        <div
          className={cn('menuFilter__buttonFilter', { menuFilter__buttonFilterOpen: isButtonAllFilters },
            { menuFilter__buttonFilterNoValue: !eventClass }, { menuFilter__buttonFilterAdd: eventClass })}
          onClick={this.openButtonAllFilters}
        >
          <FilterIcon className='menuFilter__filterIcon' />
          <span className='menuFilter__titleButton'>
            {`Event that match ${eventMatchAllFilters} filters`}
          </span>
        </div>
        <FieldsFilterPopupBox isPopupShow={isButtonAllFilters} >
          <ul className='allFilterButton__ul' >
            <li
              className={cn('allFilterButton__li', { allFilterButton__liActive: eventMatchAllFilters === 'all' })}
              onClick={this.changeEventMatchFilters('all')}
            >
              Events that match all filters
              <CheckIcon className='allFilterButton__checkIcon' />
            </li>
            <li
              className={cn('allFilterButton__li', { allFilterButton__liActive: eventMatchAllFilters === 'any' })}
              onClick={this.changeEventMatchFilters('any')}
            >
              Events that match any filters
              <CheckIcon className='allFilterButton__checkIcon' />
            </li>
          </ul>
        </FieldsFilterPopupBox>
      </div>
    )
  }
}

AllFilterButtonOutside.propTypes = {
  eventClass: PropTypes.bool,
  eventMatchAllFilters: PropTypes.string,
  applyFilterUsers: PropTypes.func.isRequired,
}

const AllFilterButton = onClickOutside(AllFilterButtonOutside)

const mapStateToProps = state => {
  const { eventMatchAllFilters } = state.usersReducer
  return { eventMatchAllFilters }
}

export default connect(
  mapStateToProps,
  { applyFilterUsers },
)(AllFilterButton)
