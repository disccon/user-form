import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ReactComponent as FilterIcon } from '../../../img/icon/filter.svg'
import { ReactComponent as CalendarIcon } from '../../../img/icon/calendar2.svg'
import { ReactComponent as AvatarIcon } from '../../../img/icon/avatarIcon.svg'
import './MenuFilter.scss'
import FilterBox from './FilterBox/FilterBox'
import BlockFilter from './FilterBox/FieldsFilterPopupBox/BlockFilter/BlockFilter'
import BlockDataFilter from './FilterBox/FieldsFilterPopupBox/BlockDataFilter/BlockDataFilter'
import SkillsFilter from './FilterBox/FieldsFilterPopupBox/SkillsFilter/SkillsFilter'
import NewFieldsFilterPopup from './NewFieldsFilterPopup/NewFieldsFilterPopup'
import AllFilterButton from './AllFilterButton/AllFilterButton'
import { saveFiltersUsers } from '../../../actions/actionUsers'

class MenuFilter extends Component {
  state = {
    isNewFilterPopupShow: false,
  }

  openNewFilterFields = () => {
    this.setState(state => ({
      isNewFilterPopupShow: !state.isNewFilterPopupShow,
    }))
  }

  render() {
    const { isNewFilterPopupShow } = this.state
    const {
      userNameIsBoxShow, companyIsBoxShow, birthDateIsBoxShow, lastUpdateIsBoxShow, skillsIsBoxShow,
      userNameFilterActive, companyFilterActive, birthDateFilterActive, lastUpdateFilterActive,
      skillsFilterActive, saveFiltersUsers,
    } = this.props
    const eventClass = userNameIsBoxShow || companyIsBoxShow || birthDateIsBoxShow || lastUpdateIsBoxShow
      || skillsIsBoxShow
    return (
      <div className='menuFilter container'>
        <AllFilterButton eventClass={eventClass} />
        {userNameIsBoxShow && (
          <FilterBox
            title='User Name'
            nameFilter='userName'
            filterPopup={<BlockFilter nameFilter='userName' />}
            icon={<AvatarIcon className='menuFilter__filterIcon' />}
            activeFilter={userNameFilterActive}
          />
        )}
        {companyIsBoxShow && (
          <FilterBox
            title='Company'
            nameFilter='company'
            filterPopup={<BlockFilter nameFilter='company' />}
            icon={<AvatarIcon className='menuFilter__filterIcon' />}
            activeFilter={companyFilterActive}
          />
        )}
        {birthDateIsBoxShow && (
        <FilterBox
          title='Birth Date'
          nameFilter='birthDate'
          filterPopup={<BlockDataFilter nameFilter='birthDate' />}
          icon={<CalendarIcon className='menuFilter__filterIcon menuFilter__calendarIcon' />}
          activeFilter={birthDateFilterActive}
        />
        )}
        {lastUpdateIsBoxShow && (
          <FilterBox
            title='Updated At'
            nameFilter='lastUpdate'
            filterPopup={<BlockDataFilter nameFilter='lastUpdate' />}
            icon={<CalendarIcon className='menuFilter__filterIcon menuFilter__calendarIcon' />}
            activeFilter={lastUpdateFilterActive}
          />
        )}
        {skillsIsBoxShow && (
          <FilterBox
            title='Skills'
            nameFilter='skills'
            filterPopup={<SkillsFilter nameFilter='skills' />}
            icon={<AvatarIcon className='menuFilter__filterIcon' />}
            activeFilter={skillsFilterActive}
          />
        )}
        <div className='menuFilter__addFilterWrapper'>
          <button className='menuFilter__addFilterButton' type='button' onClick={this.openNewFilterFields}>
              + add filter
          </button>
          <button className='menuFilter__saveFilter' type='button' onClick={saveFiltersUsers}>
            <FilterIcon className='menuFilter__saveFilterIcon' />
            <span>save filter</span>
          </button>
          <NewFieldsFilterPopup
            isNewFilterPopupShow={isNewFilterPopupShow}
            closeNewFilterFields={this.openNewFilterFields}
          />
        </div>
      </div>
    )
  }
}

MenuFilter.propTypes = {
  userNameIsBoxShow: PropTypes.bool,
  companyIsBoxShow: PropTypes.bool,
  birthDateIsBoxShow: PropTypes.bool,
  lastUpdateIsBoxShow: PropTypes.bool,
  skillsIsBoxShow: PropTypes.bool,
  userNameFilterActive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  companyFilterActive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  birthDateFilterActive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  lastUpdateFilterActive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  skillsFilterActive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  saveFiltersUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    userNameIsBoxShow, companyIsBoxShow, birthDateIsBoxShow, lastUpdateIsBoxShow, skillsIsBoxShow,
    userNameFilterActive, companyFilterActive, birthDateFilterActive, lastUpdateFilterActive,
    skillsFilterActive,
  } = state.usersReducer
  return {
    userNameIsBoxShow,
    companyIsBoxShow,
    birthDateIsBoxShow,
    lastUpdateIsBoxShow,
    skillsIsBoxShow,
    userNameFilterActive,
    companyFilterActive,
    birthDateFilterActive,
    lastUpdateFilterActive,
    skillsFilterActive,
  }
}

export default connect(
  mapStateToProps,
  { saveFiltersUsers },
)(MenuFilter)
