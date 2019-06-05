export const validateAccount = values => {
  const errors = {}
  if (!values.userName) {
    errors.userName = 'Missing User Name'
  } else if (values.userName.length <= 3) {
    errors.userName = 'Must be 4 characters or more'
  }

  if (!values.password) {
    errors.password = 'Missing Password'
  } else if (values.password.length <= 3) {
    errors.password = 'Must be 4 characters or more'
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Missing Repeat Password'
  }
  if (values.password !== values.repeatPassword) errors.repeatPassword = "Passwords doesn't match"

  return errors
}
