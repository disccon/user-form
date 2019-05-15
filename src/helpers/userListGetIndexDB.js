import db from '../db'

export const userListGetIndexDB = (usersListerState, start, end) => {
  db.listUserDB.toArray(listUserDB => {
    usersListerState(listUserDB.slice(start, end), listUserDB.length)
  })
}
