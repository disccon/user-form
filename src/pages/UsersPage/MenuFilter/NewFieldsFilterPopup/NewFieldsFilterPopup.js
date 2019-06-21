import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'
import cn from 'classnames'
import { ReactComponent as ResetIcon } from '../../../../img/icon/close2.svg'
import { ReactComponent as SearchIcon } from '../../../../img/icon/search.svg'
import { ReactComponent as AvatarIcon } from '../../../../img/icon/avatarIcon.svg'
import { ReactComponent as CalendarIcon } from '../../../../img/icon/calendar2.svg'
import './NewFieldsFilterPopup.scss'
import LiFilter from './LiFilter/LiFilter'

class NewFieldsFilterPopupOutside extends Component {
  state = {
    filterNameArr: [{ name: 'User Name', show: true }, { name: 'Company', show: true },
      { name: 'Birth Date', show: true }, { name: 'Updated At', show: true }, { name: 'Skills', show: true }],
    inputSearchValue: '',
  }

  handleClickOutside = ({ target }) => {
    const { closeNewFilterFields, isNewFilterPopupShow } = this.props
    const { className } = target
    if (isNewFilterPopupShow && className !== 'menuFilter__addFilterButton') {
      closeNewFilterFields()
    }
  }

  searchFilter = ({ target }) => {
    const filterNameArr = [{ name: 'User Name', show: true }, { name: 'Company', show: true },
      { name: 'Birth Date', show: true }, { name: 'Updated At ', show: true }, { name: 'Skills', show: true }]
    const filterNameArrShowFalse = [{ name: 'User Name', show: false }, { name: 'Company', show: false },
      { name: 'Birth Date', show: false }, { name: 'Updated At ', show: false }, { name: 'Skills', show: false }]
    const { value } = target
    if (value !== '' && value !== ' ') {
      const newArr = filterNameArr.map(user => ({
        name: user.name,
        show: user.name.toLowerCase().includes(value.toLowerCase()),
      }))
      this.setState({
        filterNameArr: newArr,
        inputSearchValue: value,
      })
    } else if (value === ' ') {
      this.setState({
        filterNameArr: filterNameArrShowFalse,
        inputSearchValue: value,
      })
    } else {
      this.setState({
        filterNameArr,
        inputSearchValue: value,
      })
    }
  }

  closeSearch = () => {
    const filterNameArr = [{ name: 'User Name', show: true }, { name: 'Company', show: true },
      { name: 'Birth Date', show: true }, { name: 'Updated At ', show: true }, { name: 'Skills', show: true }]
    this.setState({
      filterNameArr,
      inputSearchValue: '',
    })
  }

  render() {
    const {
      userNameIsBoxShow, companyIsBoxShow, birthDateIsBoxShow, lastUpdateIsBoxShow, skillsIsBoxShow,
      isNewFilterPopupShow, closeNewFilterFields,
    } = this.props
    const { filterNameArr, inputSearchValue } = this.state
    return (
      <ul className={cn('newFieldsFilterPopup', 'menuFilterPopup', { menuFilterPopupShow: isNewFilterPopupShow })}>
        <li className='newFieldsFilterPopup__addFilter newFieldsFilterPopup__searchFilter'>
          <div className='newFieldsFilterPopup__rowWrapper'>
            <SearchIcon className='newFieldsFilterPopup__searchIcon' />
            <input
              value={inputSearchValue}
              className='newFieldsFilterPopup__searchInput'
              type='search'
              placeholder='Search Filters'
              onChange={this.searchFilter}
            />
          </div>
          <button className='newFieldsFilterPopup__searchReset' type='button' onClick={this.closeSearch}>
            <ResetIcon className='newFieldsFilterPopup__searchResetIcon' />
          </button>
        </li>
        {!userNameIsBoxShow && filterNameArr[0].show && (
          <LiFilter
            icon={<AvatarIcon className='newFieldsFilterPopup__avatarIcon' />}
            title={filterNameArr[0].name}
            nameFilter='userNameIsBoxShow'
            closeFilterFields={closeNewFilterFields}
          />
        )}
        {!companyIsBoxShow && filterNameArr[1].show && (
          <LiFilter
            icon={<AvatarIcon className='newFieldsFilterPopup__avatarIcon' />}
            title={filterNameArr[1].name}
            nameFilter='companyIsBoxShow'
            closeFilterFields={closeNewFilterFields}
          />
        )}
        {!birthDateIsBoxShow && filterNameArr[2].show && (
          <LiFilter
            icon={<CalendarIcon className='newFieldsFilterPopup__calendarIcon' />}
            title={filterNameArr[2].name}
            nameFilter='birthDateIsBoxShow'
            closeFilterFields={closeNewFilterFields}
          />
        )}
        {!lastUpdateIsBoxShow && filterNameArr[3].show && (
          <LiFilter
            icon={<CalendarIcon className='newFieldsFilterPopup__calendarIcon' />}
            title={filterNameArr[3].name}
            nameFilter='lastUpdateIsBoxShow'
            closeFilterFields={closeNewFilterFields}
          />
        )}
        {!skillsIsBoxShow && filterNameArr[4].show && (
          <LiFilter
            icon={<AvatarIcon className='newFieldsFilterPopup__avatarIcon' />}
            title={filterNameArr[4].name}
            nameFilter='skillsIsBoxShow'
            closeFilterFields={closeNewFilterFields}
          />
        )}
      </ul>
    )
  }
}

NewFieldsFilterPopupOutside.propTypes = {
  userNameIsBoxShow: PropTypes.bool,
  companyIsBoxShow: PropTypes.bool,
  birthDateIsBoxShow: PropTypes.bool,
  lastUpdateIsBoxShow: PropTypes.bool,
  skillsIsBoxShow: PropTypes.bool,
  isNewFilterPopupShow: PropTypes.bool.isRequired,
  closeNewFilterFields: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const {
    userNameIsBoxShow, companyIsBoxShow, birthDateIsBoxShow, lastUpdateIsBoxShow, skillsIsBoxShow,
  } = state.usersReducer
  return {
    userNameIsBoxShow, companyIsBoxShow, birthDateIsBoxShow, lastUpdateIsBoxShow, skillsIsBoxShow,
  }
}

const NewFieldsFilterPopup = onClickOutside(NewFieldsFilterPopupOutside)

export default connect(
  mapStateToProps,
)(NewFieldsFilterPopup)
