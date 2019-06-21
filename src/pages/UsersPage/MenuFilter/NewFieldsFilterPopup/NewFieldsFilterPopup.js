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

const initialLiFilterArr = [
  {
    title: 'User Name',
    show: true,
    icon: <AvatarIcon className='newFieldsFilterPopup__avatarIcon' />,
    nameFilter: 'userNameIsBoxShow',
    key: 1,
  },
  {
    title: 'Company',
    show: true,
    icon: <AvatarIcon className='newFieldsFilterPopup__avatarIcon' />,
    nameFilter: 'companyIsBoxShow',
    key: 2,
  },
  {
    title: 'Birth Date',
    show: true,
    icon: <CalendarIcon className='newFieldsFilterPopup__calendarIcon' />,
    nameFilter: 'birthDateIsBoxShow',
    key: 3,
  },
  {
    title: 'Updated At',
    show: true,
    icon: <CalendarIcon className='newFieldsFilterPopup__calendarIcon' />,
    nameFilter: 'lastUpdateIsBoxShow',
    key: 4,
  },
  {
    title: 'Skills',
    show: true,
    icon: <AvatarIcon className='newFieldsFilterPopup__avatarIcon' />,
    nameFilter: 'skillsIsBoxShow',
    key: 5,
  }]

class NewFieldsFilterPopupOutside extends Component {
  state = {
    liFilterArr: initialLiFilterArr,
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
    const { value } = target
    if (value !== '' && value !== ' ') {
      const liFilterArr = initialLiFilterArr.map(user => ({
        ...user,
        show: user.title.toLowerCase().includes(value.toLowerCase()),
      }))
      this.setState({
        liFilterArr,
        inputSearchValue: value,
      })
      return
    }
    if (value === ' ') {
      const liFilterArr = initialLiFilterArr.map(user => ({
        ...user,
        show: false,
      }))
      this.setState({
        liFilterArr,
        inputSearchValue: value,
      })
      return
    }
    if (value === '') {
      this.setState({
        liFilterArr: initialLiFilterArr,
        inputSearchValue: value,
      })
    }
  }

  closeSearch = () => {
    this.setState({
      liFilterArr: initialLiFilterArr,
      inputSearchValue: '',
    })
  }

  render() {
    const { isNewFilterPopupShow, closeNewFilterFields } = this.props
    const { liFilterArr, inputSearchValue } = this.state
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
        {liFilterArr.map(filter => (
          !this.props[filter.nameFilter] && filter.show && (
            <LiFilter
              key={filter.key}
              icon={filter.icon}
              title={filter.title}
              nameFilter={filter.nameFilter}
              closeFilterFields={closeNewFilterFields}
            />
          )
        ))}
      </ul>
    )
  }
}

NewFieldsFilterPopupOutside.propTypes = {
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
