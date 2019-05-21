import React from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export const CropperModalWindow = ({ cropperSrc, setCropper }) => (
  <Cropper
    src={cropperSrc}
    style={{
      height: '650px',
      position: 'fixed',
      top: '120px',
      left: '15%',
      right: '15%',
      zIndex: '99',
    }}
    aspectRatio={9 / 9}
    guides={false}
    ref={setCropper}
  />
)

CropperModalWindow.propTypes = {
  cropperSrc: PropTypes.string,
  setCropper: PropTypes.func.isRequired,
}
