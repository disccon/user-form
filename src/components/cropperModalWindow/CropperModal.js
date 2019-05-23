import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import classNames from 'classnames'
import 'cropperjs/dist/cropper.css'
import styles from './CropperModal.scss'

const cx = classNames.bind(styles)

class CropperModal extends Component {
  cropImage = () => {
    const { changeAvatar, setCropperSrc } = this.props
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    setCropperSrc()
    changeAvatar(this.cropper.getCroppedCanvas().toDataURL())
  }

  setCropper = cropper => {
    this.cropper = cropper
  }

  render() {
    const { cropperSrc, setCropperSrc } = this.props
    return (
      <Fragment>
        <div className={cx('cropperModal__wrapper')}>
          <Cropper
            src={cropperSrc}
            style={{
              width: '962px',
              height: '533px',
              background: '#fff',
            }}
            aspectRatio={9 / 9}
            guides={false}
            background={false}
            ref={this.setCropper}
          />
        </div>
        <div className={cx('cropperModal__wrapperButton')}>
          <button className={cx('cropperModal__close')} type='button' onClick={setCropperSrc} >
            Close
          </button>
          <button className={cx('cropperModal__cropImage')} type='button' onClick={this.cropImage} >
            Crop Image
          </button>
        </div>
      </Fragment>
    )
  }
}

CropperModal.propTypes = {
  cropperSrc: PropTypes.string,
  setCropperSrc: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
}

export default CropperModal
