import Dexie from 'dexie'

const db = new Dexie('dbNewUser')
db.version(1).stores({ newUserDB: '++id' })
db.version(1).stores({ listUserDB: '++id' })

export default db
