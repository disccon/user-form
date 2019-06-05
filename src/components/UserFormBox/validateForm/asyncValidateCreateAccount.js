import db from '../../../db'

export const asyncValidateCreateAccount = values => db.usersDB.toArray(usersDB => {
  const userNameList = usersDB.map(user => user.userName)
  let errorUserName
  userNameList.find(userEmail => (
    errorUserName = values.userName === userEmail ? 'already have this email in the database' : null))
  if (errorUserName) {
    return Promise.reject({
      userName: errorUserName,
    })
  }
})
