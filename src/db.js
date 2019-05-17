import Dexie from 'dexie'
import { users } from './stubs/users'
import { initialNewUserState } from './stubs/initialNewUserState'

const db = new Dexie('dbNewUser')
db.version(1).stores({ newUserDB: '++id' })
db.version(1).stores({ usersDB: '++id' })

db.newUserDB.get(0, newUserDB => {
  if (!newUserDB) {
    db.newUserDB.add(initialNewUserState)
  }
})

db.usersDB.toArray(usersDB => {
  if (usersDB.length <= 0) {
    users.forEach(item => {
      db.usersDB.add(item)
    })
  }
})

export default db
