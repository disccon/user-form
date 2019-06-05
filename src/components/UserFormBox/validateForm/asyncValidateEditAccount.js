import db from '../../../db'

export const asyncValidateEditAccount = (values, id) => (
  db.usersDB.toArray(usersDB => {
    const userFilterName = usersDB.filter(user => user.id !== id)
    const userNameList = userFilterName.map(user => user.userName)
    let errorUserName
    userNameList.find(userEmail => (
      errorUserName = values.userName === userEmail ? 'already have this userName in the database' : null))
    if (errorUserName) {
      return Promise.reject({
        userName: errorUserName,
      })
    }
  })
)
