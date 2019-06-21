import db from '../../../db'

export const asyncValidateEditAccount = (values, id) => (
  db.usersDB.toArray(usersDB => {
    const userFilterName = usersDB.filter(user => user.id !== id)
    const userNameList = userFilterName.map(user => user.userName)
    const userFound = userNameList.find(userName => values.userName.toLowerCase() === userName.toLowerCase())
    if (userFound) {
      return Promise.reject({
        userName: 'already have this userName in the database',
      })
    }
  })
)
