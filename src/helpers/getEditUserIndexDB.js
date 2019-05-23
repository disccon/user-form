import db from '../db'

export const getEditUserIndexDB = id => db.usersDB.get(id)
