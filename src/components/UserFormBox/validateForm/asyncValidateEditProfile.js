import db from '../../../db'

export const asyncValidateEditProfile = (values, id) => (
  db.usersDB.toArray(usersDB => {
    const userFilterName = usersDB.filter(user => user.id !== id)
    const userEmailList = userFilterName.map(user => user.email)
    let errorEmail
    userEmailList.find(userEmail => (
      errorEmail = values.email === userEmail ? 'already have this email in the database' : null))
    if (errorEmail) {
      return Promise.reject({
        email: errorEmail,
      })
    }
  })
)
