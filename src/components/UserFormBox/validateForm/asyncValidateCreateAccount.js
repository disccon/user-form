import db from '../../../db'

export const asyncValidateCreateAccount = values => db.usersDB.toArray(usersDB => {
  const userNameList = usersDB.map(user => user.userName)
  const userFound = userNameList.find(userName => values.userName.toLowerCase() === userName.toLowerCase())
  if (userFound) {
    return Promise.reject({
      userName: 'already have this email in the database',
    })
  }
})
