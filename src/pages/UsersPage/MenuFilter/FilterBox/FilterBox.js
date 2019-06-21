import React, { Component } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import { connect } from 'react-redux'
import cn from 'classnames'
import { ReactComponent as ResetIcon } from '../../../../img/icon/close2.svg'
import '../NewFieldsFilterPopup/NewFieldsFilterPopup.scss'
import { applyFilterUsers } from '../../../../actions/actionUsers'
import FieldsFilterPopupBox from './FieldsFilterPopupBox/FieldsFilterPopupBox'

class FilterBoxOutside extends Component {
  state = {
    show: false,
    isPopupShow: false,
  }

  componentDidMount() {
    this.timeoutShow = setTimeout(() => {
      this.setState({
        show: true,
      })
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.timeoutShow)
    clearInterval(this.timeoutHide)
  }

  handleClickOutside = () => {
    this.setState({
      isPopupShow: false,
    })
  }

  closeButton = () => {
    const { applyFilterUsers, nameFilter } = this.props
    this.setState({
      hide: true,
      isPopupShow: false,
    })
    this.timeoutHide = setTimeout(() => {
      applyFilterUsers('deleteFilter', nameFilter)
    }, 400)
  }

  changeStatePopup = ({ target }) => {
    if (target.parentNode.className !== 'menuFilter__buttonDeleteFilter'
      && target.className !== 'menuFilter__buttonDeleteFilter') {
      this.setState(state => ({
        isPopupShow: !state.isPopupShow,
      }))
    }
  }

  closePopup = ({ target }) => {
    if (target.className === 'fieldsFilterPopupBox__done') {
      this.setState({
        isPopupShow: false,
      })
    }
  }

  render() {
    const { show, hide, isPopupShow } = this.state
    const {
      title, filterPopup, icon, activeFilter,
    } = this.props
    return (
      <div className='menuFilter__filterBox'>
        <div
          className={cn('menuFilter__buttonFilter', { menuFilter__buttonFilterOpen: isPopupShow },
            { menuFilter__buttonFilterNoValue: show }, { menuFilter__buttonFilterHide: hide },
            { menuFilter__buttonFilterAdd: activeFilter })}
          onClick={this.changeStatePopup}
        >
          {icon}
          <span className='menuFilter__titleButton'>
            {title}
            {activeFilter.buttonFilterValue && (` ${activeFilter.buttonFilterValue}`)}
          </span>
          <button className='menuFilter__buttonDeleteFilter' type='button' onClick={this.closeButton}>
            <ResetIcon className='menuFilter__iconDeleteFilter' />
          </button>
        </div>
        <FieldsFilterPopupBox isPopupShow={isPopupShow} closePopup={this.closePopup}>
          {filterPopup}
        </FieldsFilterPopupBox>
      </div>
    )
  }
}

FilterBoxOutside.propTypes = {
  title: PropTypes.string.isRequired,
  filterPopup: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
  nameFilter: PropTypes.string.isRequired,
  applyFilterUsers: PropTypes.func.isRequired,
  activeFilter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
}

const FilterBox = onClickOutside(FilterBoxOutside)

export default connect(
  null,
  { applyFilterUsers },
)(FilterBox)
