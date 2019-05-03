import Dexie from 'dexie'

const db = new Dexie('dbNewUser')
db.version(1).stores({ newUserDB: '++id' })
db.version(1).stores({ listUserDB: '++id' })

export default db

export const getDB = (nameDB, nameAction) => {
  db.table(`${nameDB}`)
    .toArray()
    .then(nameDB => {
      nameAction(nameDB)
    })
}

export const addDB = (nameDB, addItem) => {
  db.table(nameDB)
    .add(addItem)
}

export const updateDB = (nameDB, key, updateItem) => {
  db.table(nameDB)
    .update(key, {
      updateItem,
    })
}

export const deleteDB = (nameDB, key) => {
  db.table(nameDB)
    .delete(key)
}
