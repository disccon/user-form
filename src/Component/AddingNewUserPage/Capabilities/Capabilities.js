import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Capabilities.scss'


const cx = classNames.bind(styles)


class Capabilities extends Component {
  render() {
    return (
      <div className={cx('capabilities')}>
        <div className={cx('capabilities__sideLeft')}>
          <span>Skills</span>
          <input className={cx('capabilities__selectInput')}/>
          <select size="5" className={cx('capabilities__selectOption')}>
            <option>aerobica</option>
            <option selected="selected">skill 1</option>
            <option>art direction</option>
            <option>art direction</option>
            <option>art direction</option>
          </select>
          <span className={cx('capabilities__informationSpan')}>Additional information</span>
          <textarea rows="10" cols="45" name="text"
                    value="Guitar, guitar and guitar again. I’m fall in love with it."></textarea>
        </div>
        <div className={cx('capabilities__sideRight')}>
          <span>My hobbies</span>
          <div className={cx('capabilities__wrapperCheckbox')}>
            <input type="checkbox" id="checkboxArt" name="checkbox" value="checkbox"/><label
            htmlFor="checkboxArt">Art</label>
          </div>
          <div className={cx('capabilities__wrapperCheckbox')}>
            <input type="checkbox" id="checkboxArt" name="checkbox" value="checkbox"/><label htmlFor="checkboxArt">Sport,
            fitness, aerobica and staff like that</label>
          </div>
          <div className={cx('capabilities__wrapperCheckbox')}>
            <input type="checkbox" id="checkboxArt" name="checkbox" value="checkbox"/><label htmlFor="checkboxArt">I
            just want to play games, I’m not living in this life</label>
          </div>
          <div className={cx('capabilities__wrapperCheckbox')}>
            <input type="checkbox" id="checkboxArt" name="checkbox" value="checkbox"/><label htmlFor="checkboxArt">I
            I’m a female... I’m doing nothing. Every day.</label>
          </div>
          <div className={cx('capabilities__wrapperCheckbox')}>
            <input type="checkbox" id="checkboxArt" name="checkbox" value="checkbox"/><label htmlFor="checkboxArt">I
            Guitar, guitar and guitar again. I’m fall in love with it.</label>
          </div>
          <div className={cx('capabilities__wrapperCheckbox')}>
            <input type="checkbox" id="checkboxArt" name="checkbox" value="checkbox"/><label htmlFor="checkboxArt">I
            WTF is “hobbies”???</label>
          </div>
          <div className={cx('capabilities__wrapperButton')}>
            <button type="submit" className={cx('capabilities__back')}>Back</button>
            <button type="submit" className={cx('capabilities__finish')}>Finish</button>
          </div>
        </div>
      </div>
    )
  }
}

Capabilities.propTypes = {}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
)(Capabilities)