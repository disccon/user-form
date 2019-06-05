import db from '../../../db'

export const asyncValidateCreateProfile = values => db.usersDB.toArray(usersDB => {
  const userEmailList = usersDB.map(user => user.email)
  let errorEmail
  userEmailList.find(userEmail => (
    errorEmail = values.email === userEmail ? 'already have this email in the database' : null))
  if (errorEmail) {
    return Promise.reject({
      email: errorEmail,
    })
  }
})
