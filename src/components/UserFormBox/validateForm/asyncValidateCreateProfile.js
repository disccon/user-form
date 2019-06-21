import db from '../../../db'

export const asyncValidateCreateProfile = values => db.usersDB.toArray(usersDB => {
  const userEmailList = usersDB.map(user => user.email)
  const emailFound = userEmailList.find(userEmail => values.email.toLowerCase() === userEmail.toLowerCase())
  if (emailFound) {
    return Promise.reject({
      email: 'already have this email in the database',
    })
  }
})
