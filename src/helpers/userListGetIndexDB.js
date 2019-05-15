import db from '../db'
import { users } from '../stubs/users'

export const userListGetIndexDB = userListerNewState => {
  db.listUserDB.toArray(listUserDB => {
    if (listUserDB.length > 0) {
      userListerNewState(listUserDB)
    } else {
      users.forEach(item => {
        db.listUserDB.add(item)
      })
    }
  })
}
