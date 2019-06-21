import Dexie from 'dexie'
import { users } from './stubs/users'
import { initialNewUserState } from './stubs/initialNewUserState'
import { initialUsersFilters } from './stubs/initialUsersFilters'

const db = new Dexie('dbNewUser')
db.version(1).stores({ newUserDB: '++id' })
db.version(1).stores({ usersDB: '++id' })
db.version(1).stores({ usersFiltersDB: '++id' })

db.newUserDB.get(0, newUserDB => {
  if (!newUserDB) {
    db.newUserDB.add(initialNewUserState)
  }
})

db.usersFiltersDB.get(0, usersFiltersDB => {
  if (!usersFiltersDB) {
    db.usersFiltersDB.add(initialUsersFilters)
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
