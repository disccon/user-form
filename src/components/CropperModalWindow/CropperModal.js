import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import classNames from 'classnames'
import 'cropperjs/dist/cropper.css'
import styles from './CropperModal.scss'

const cx = classNames.bind(styles)

class CropperModal extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: true,
      })
    }, 50)
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
    setTimeout(() => {
      setCropperSrc(false)()
    }, 400)
  }

  render() {
    const { cropperSrc } = this.props
    const { show } = this.state
    return (
      <Fragment>
        <div
          className={cx('cropperModal__backdrop', { cropperModal__backdropShow: show })}
          onClick={this.closeModal}
        />
        <div className={cx('cropperModal__modal', { cropperModal__modalShow: show })}>
          <div className={cx('cropperModal__modalHeader')}>
            <h4 className={cx('cropperModal__title')}>Crop Image</h4>
            <button className={cx('cropperModal__closeButton')} type='button' onClick={this.closeModal}>
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
          <div className={cx('cropperModal__wrapperButton')}>
            <button className={cx('cropperModal__close')} type='button' onClick={this.closeModal}>
              Close
            </button>
            <button className={cx('cropperModal__saveAvatar')} type='button' onClick={this.saveAvatar}>
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
