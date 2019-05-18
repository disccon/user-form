import db from '../db'

export const getEditUserIndexDB = (fetchEditUser, id) => {
  db.usersDB.get(id, user => {
    fetchEditUser(user)
  })
}
