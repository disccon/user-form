export const validateContacts = values => {
  const errors = {}
  if (!values.selectLanguage) {
    errors.selectLanguage = 'Missing Main language'
  }

  if (!values.company) {
    errors.company = 'Missing Company'
  } else if (values.company.length <= 2) {
    errors.company = 'Must be 3 characters or more'
  }

  if (!values.githubLink) {
    errors.githubLink = 'Missing Github Link'
  } else if (values.githubLink.length <= 5) {
    errors.githubLink = 'Must be 4 characters or more'
  }

  if (!values.facebookLink) {
    errors.facebookLink = 'Missing Facebook Link'
  } else if (values.facebookLink.length <= 5) {
    errors.facebookLink = 'Must be 4 characters or more'
  }

  if (!values.fax) {
    errors.fax = 'Missing Facebook Fax'
  } else if (values.fax.search('_') > 0) {
    errors.fax = 'Must be 10 digits'
  }

  const phoneArrayErrors = []
  if (!values.phoneArray || !values.phoneArray.length) {
    errors.phoneArray = { phoneArray: 'Missing Phone Number' }
  } else {
    values.phoneArray.forEach((phone, phoneIndex) => {
      const phoneErrors = {}
      if (!phone.phone) {
        phoneErrors.phone = 'Missing Phone Number'
        phoneArrayErrors[phoneIndex] = phoneErrors
      } else if (phone.phone.search('_') > 0) {
        phoneErrors.phone = 'Must be 10 digits'
        phoneArrayErrors[phoneIndex] = phoneErrors
      }
    })
  }
  if (phoneArrayErrors.length) {
    errors.phoneArray = phoneArrayErrors
  }

  return errors
}
