import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './Capabilities.scss'
import Select from 'react-select'
import { saveSelectSkills, saveTextareaField, saveCheckboxArt, saveCheckboxSport, saveCheckboxJustWant, saveCheckboxFemale,
  saveCheckboxGuitar, saveCheckboxWtf, } from '../../../Actions'




const cx = classNames.bind(styles)

const options = [
  { value: 'HTML', label: 'HTML' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'React', label: 'React' },
  { value: 'Angular', label: 'Angular' },
  { value: 'jQuery', label: 'jQuery' },
  { value: 'NodeJS', label: 'NodeJS' },
  { value: 'Python', label: 'Python' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Ruby On Rails', label: 'Ruby On Rails' },
  { value: 'SQL', label: 'SQL' },
  { value: 'BackboneJS', label: 'BackboneJS' },
  { value: 'Web Design', label: 'Web Design' },
  { value: 'Project management', label: 'Project management' },
  { value: 'Git', label: 'Git' },
  { value: 'Docker', label: 'Docker' },
  { value: 'AWS Lambda', label: 'AWS Lambda' },
  { value: 'Firebase', label: 'Firebase' },
]


const colourStyles = {
  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: '#E7F0FF',
    ':hover': {
      backgroundColor: '#4E86E4',
      color: 'white',
    },
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    backgroundColor: '#E7F0FF',
    color: '#9BB0CB',
  }),
  control: styles => ({
    ...styles,
    width: '300px',
    minHeight: '40px',
    backgroundColor: 'white',
    border: '1px solid #C1CFE0',
    borderRadius: '0px',
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: 'white',
  }),
  clearIndicator: styles => ({
    ...styles,
    position: 'absolute',
    right: '-37px',
  }),
  container: styles => ({
    ...styles,
    color: '#657C9A',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
  }),
  menuList: styles => ({
    ...styles,
    height: '132px',
  }),
  menu: styles => ({
    ...styles,
    borderRadius: '0px',
  }),
  input: styles => ({
    ...styles,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
    color: '#000000',
  }),
  placeholder: styles => ({
    ...styles,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
    color: '#657C9A',
  }),
  singleValue: styles => ({
    ...styles,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: 'normal',
    fontStyle: 'normal',
    color: '#000000',
  }),
};

class Capabilities extends Component {
  state = {
    skillsError: false,
  }
  componentDidUpdate() {
    const { selectSkills } = this.props
    const { skillsError } = this.state
    if (skillsError !== false && selectSkills.length >= 3 && skillsError !== null) {
      this.setState({
        skillsError: null
      })
    } else  if (skillsError === null && selectSkills.length <= 2 ){
      this.setState({
        skillsError: 'select at least 3 option',
      })
    }
  }
  onBlurSelectSkills = () => {
    const { selectSkills } = this.props
    if (!selectSkills) {
      this.setState({
        skillsError: 'Missing Skills',
      })
    } else if (selectSkills.length <= 2) {
      this.setState({
        skillsError: 'select at least 3 option',
      })
    } else {
      this.setState({
        skillsError: false,
      })
    }
  }
  saveSelectSkills = selectSkills => {
    const { saveSelectSkills } = this.props
    saveSelectSkills(selectSkills)
  }
  saveTextareaField = event => {
    const { saveTextareaField } = this.props
    saveTextareaField(event.target.value)
  }
  saveCheckboxArt = ({target}) => {
    const { saveCheckboxArt } = this.props
    saveCheckboxArt(target.value)
  }
  saveCheckboxSport = ({target}) => {
    const { saveCheckboxSport } = this.props
    saveCheckboxSport(target.value)
  }
  saveCheckboxJustWant = ({target}) => {
    const { saveCheckboxJustWant } = this.props
    saveCheckboxJustWant(target.value)
  }
  saveCheckboxFemale = ({target}) => {
    const { saveCheckboxFemale } = this.props
    saveCheckboxFemale(target.value)
  }
  saveCheckboxGuitar = ({target}) => {
    const { saveCheckboxGuitar } = this.props
    saveCheckboxGuitar(target.value)
  }
  saveCheckboxWtf = ({target}) => {
    const { saveCheckboxWtf } = this.props
    saveCheckboxWtf(target.value)
  }
  backCapabilities = () => {
    const { history } = this.props
    history.push('/Contacts')
  }
  // forwardCapabilities = () => {
  //
  //   forwardBackCapabilities('forward')
  // }

  render() {
    const { selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant, checkboxFemale, checkboxGuitar, checkboxWtf, } = this.props
    const { skillsError } = this.state
    return (
      <div className={cx('capabilities')}>
        <div className={cx('capabilities__sideLeft')}>
          <label>
            <h4>Skills</h4>
            <Select
              onChange={this.saveSelectSkills}
              value={selectSkills}
              isMulti
              name="colors"
              options={options}
              styles={colourStyles}
              className="basic-multi-select"
              onBlur={this.onBlurSelectSkills}
            />
            {skillsError && <p>{skillsError}</p>}
          </label>
          <label>
            <h4>Additional information</h4>
            <textarea rows="10" cols="45" name="text"
                      onChange={this.saveTextareaField}
                      value={textareaField}></textarea>
          </label>
        </div>
        <div className={cx('capabilities__sideRight')}>
          <h3>My hobbies</h3>
          <label>
            <input type="checkbox" name="checkboxArt" value='Art'
              checked={checkboxArt}
              onChange={this.saveCheckboxArt}
            />
            <span>Art</span>
          </label>
          <label>
            <input type="checkbox" name="checkboxSport" value='Sport,fitness, aerobica and staff like that'
              checked={checkboxSport}
              onChange={this.saveCheckboxSport}
            />
            <span>Sport,fitness, aerobica and staff like that</span>
          </label>
          <label>
            <input type="checkbox" name="checkboxJustWant" value='just want to play games, I’m not living in this life'
              checked={checkboxJustWant}
              onChange={this.saveCheckboxJustWant}
            />
            <span>just want to play games, I’m not living in this life</span>
          </label>
          <label>
            <input type="checkbox" name="checkboxFemale" value='I’m a female... I’m doing nothing. Every day.'
              checked={checkboxFemale}
              onChange={this.saveCheckboxFemale}
            />
            <span>I’m a female... I’m doing nothing. Every day.</span>
          </label>
          <label>
            <input type="checkbox" name="checkboxGuitar" value='Guitar, guitar and guitar again. I’m fall in love with it.'
              checked={checkboxGuitar}
              onChange={this.saveCheckboxGuitar}
            />
            <span>Guitar, guitar and guitar again. I’m fall in love with it.</span>
          </label>
          <label>
            <input type="checkbox" name="checkboxWtf" value='WTF is “hobbies”???'
              checked={checkboxWtf}
              onChange={this.saveCheckboxWtf}
            />
            <span>WTF is “hobbies”???</span>
          </label>
          <div className={cx('capabilities__wrapperButton')}>
            <button type="button" className={cx('capabilities__back')} onClick={this.backCapabilities}>Back</button>
            <button type="button" className={cx('capabilities__finish')} onClick={this.forwardCapabilities}>Finish</button>
          </div>
        </div>
      </div>
    )
  }
}

Capabilities.propTypes = {}


const mapStateToProps = state => ({
  selectSkills: state.newUser.selectSkills,
  textareaField: state.newUser.textareaField,
  checkboxArt: state.newUser.checkboxArt,
  checkboxSport: state.newUser.checkboxSport,
  checkboxJustWant: state.newUser.checkboxJustWant,
  checkboxFemale: state.newUser.checkboxFemale,
  checkboxGuitar: state.newUser.checkboxGuitar,
  checkboxWtf: state.newUser.checkboxWtf,
})

// const mapStateToProps = state => {
//   const { skillsSelect } = state.newUser
//   {
//     return {
//       skillsSelect,
//     }
//   }
// }

export default connect(
  mapStateToProps,
  { saveSelectSkills, saveTextareaField, saveCheckboxArt, saveCheckboxSport, saveCheckboxJustWant,
    saveCheckboxFemale, saveCheckboxGuitar, saveCheckboxWtf, }
)(Capabilities)