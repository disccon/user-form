import db from '../../../db'

export const asyncValidateEditProfile = (values, id) => (
  db.usersDB.toArray(usersDB => {
    const userFilterName = usersDB.filter(user => user.id !== id)
    const userEmailList = userFilterName.map(user => user.email)
    const emailFound = userEmailList.find(userEmail => values.email.toLowerCase() === userEmail.toLowerCase())
    if (emailFound) {
      return Promise.reject({
        email: 'already have this email in the database',
      })
    }
  })
)
