import Dexie from 'dexie'

const db = new Dexie('dbNewUser')
db.version(1).stores({ newUserDB: '++keyDB' })
db.version(1).stores({ listUserDB: '++id' })

export default db
