import Dexie from 'dexie'
import { users } from './stubs/users'
import { newUser } from './stubs/newUser'

const db = new Dexie('dbNewUser')
db.version(1).stores({ newUserDB: '++id' })
db.version(1).stores({ listUserDB: '++id' })

db.newUserDB.get(0, newUserDB => {
  if (!newUserDB) {
    db.newUserDB.add(newUser)
  }
})

db.listUserDB.toArray(listUserDB => {
  if (listUserDB.length <= 0) {
    users.forEach(item => {
      db.listUserDB.add(item)
    })
  }
})

export default db
