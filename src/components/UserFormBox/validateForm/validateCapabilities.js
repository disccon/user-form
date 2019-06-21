export const validateCapabilities = values => {
  const errors = {}

  if (!values.skills) {
    errors.skills = 'Missing Skills'
  } else if (values.skills.length <= 2) {
    errors.skills = 'select at least 3 option'
  }
  if (!values.textareaField) {
    errors.textareaField = 'Missing Additional Information'
  } else if (values.textareaField.length <= 10) {
    errors.textareaField = 'Must be 11 characters or more'
  }
  if (!values.checkboxArt && !values.checkboxSport && !values.checkboxJustWant && !values.checkboxFemale
    && !values.checkboxGuitar && !values.checkboxWtf) {
    errors.checkboxWtf = 'Missing My Hobbies'
  }

  return errors
}
