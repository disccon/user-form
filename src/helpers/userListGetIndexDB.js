import db from '../db'
import { users } from '../stubs/users'

export const userListGetIndexDB = userListerNewState => {
  db.listUserDB.toArray(listUserDB => {
    if (listUserDB) {
      userListerNewState(listUserDB)
    } else {
      userListerNewState(users)
      users.forEach(item => {
        db.listUserDB.add(item)
      })
    }
  })
}
