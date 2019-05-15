import db from '../db'

export const userGetIndexDB = (userEditNewState, id) => {
  db.listUserDB.get(id, user => {
    userEditNewState(user)
  })
}
