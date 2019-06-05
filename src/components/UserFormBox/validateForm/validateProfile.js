export const validateProfile = values => {
  const errors = {}
  if (!values.birthDate) {
    errors.birthDate = 'Missing Birth Date'
  } else if ((new Date().getFullYear() - values.birthDate.getFullYear()) < 18) {
    errors.birthDate = 'Sorry, you must be at least 18 years old'
  }

  if (!values.gender) {
    errors.gender = 'Missing Gender'
  }

  if (!values.firstName) {
    errors.firstName = 'Missing First name'
  } else if (values.firstName.length <= 2) {
    errors.firstName = 'Must be 3 characters or more'
  }
  if (!values.lastName) {
    errors.lastName = 'Missing Last name'
  } else if (values.lastName.length <= 2) {
    errors.lastName = 'Must be 3 characters or more'
  }

  if (!values.address) {
    errors.address = 'Missing Address'
  }
  if (!values.email) {
    errors.email = 'Missing Email'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}
