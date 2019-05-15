import db from '../db'

export const userGetIndexDB = (userEditNewState, id) => {
  db.usersDB.get(id, user => {
    userEditNewState(user)
  })
}
