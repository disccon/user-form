import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import cn from 'classnames'
import 'cropperjs/dist/cropper.css'
import './CropperModal.scss'

class CropperModal extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    this.timeoutShow = setTimeout(() => {
      this.setState({
        show: true,
      })
    }, 50)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutCropper)
    clearTimeout(this.timeoutShow)
  }

  saveAvatar = () => {
    const { changeAvatar, cropperSrc } = this.props
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    changeAvatar(this.cropper.getCroppedCanvas().toDataURL(), cropperSrc)
    this.closeModal()
  }

  setCropper = cropper => {
    this.cropper = cropper
  }

  closeModal = () => {
    const { setCropperSrc } = this.props
    this.setState({
      show: false,
    })
    this.timeoutCropper = setTimeout(() => {
      setCropperSrc(false)()
    }, 400)
  }

  render() {
    const { cropperSrc } = this.props
    const { show } = this.state
    return (
      <Fragment>
        <div
          className={cn('cropperModal__backdrop', { cropperModal__backdropShow: show })}
          onClick={this.closeModal}
        />
        <div className={cn('cropperModal__modal', { cropperModal__modalShow: show })}>
          <div className='cropperModal__modalHeader'>
            <h4 className='cropperModal__title'>Crop Image</h4>
            <button className='cropperModal__closeButton' type='button' onClick={this.closeModal}>
              X
            </button>
          </div>
          <Cropper
            src={cropperSrc}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
              height: '533px',
              background: '#fff',
            }}
            aspectRatio={9 / 9}
            guides={false}
            background={false}
            ref={this.setCropper}
          />
          <div className='cropperModal__wrapperButton'>
            <button className='cropperModal__close' type='button' onClick={this.closeModal}>
              Close
            </button>
            <button className='cropperModal__saveAvatar' type='button' onClick={this.saveAvatar}>
              Save Avatar
            </button>
          </div>
        </div>
      </Fragment>
    )
  }
}

CropperModal.propTypes = {
  cropperSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  setCropperSrc: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
}

export default CropperModal
