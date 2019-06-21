import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../NewFieldsFilterPopup.scss'
import { showButtonFilter } from '../../../../../actions/actionUsers'

class LiFilter extends Component {
  componentWillUnmount() {
    clearTimeout(this.timeoutFilter)
  }

  addFilter = () => {
    const { showButtonFilter, nameFilter, closeFilterFields } = this.props
    closeFilterFields()
    this.timeoutFilter = setTimeout(() => {
      showButtonFilter(nameFilter)
    }, 400)
  }

  render() {
    const { icon, title } = this.props
    return (
      <li className='newFieldsFilterPopup__addFilter'>
        <div className='newFieldsFilterPopup__rowWrapper' onClick={this.addFilter}>
          {icon}
          <h4 className='newFieldsFilterPopup__filterHeadline' >{title}</h4>
        </div>
      </li>
    )
  }
}

LiFilter.propTypes = {
  icon: PropTypes.object.isRequired,
  nameFilter: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  closeFilterFields: PropTypes.func.isRequired,
  showButtonFilter: PropTypes.func.isRequired,
}

export default connect(
  null,
  { showButtonFilter },
)(LiFilter)
