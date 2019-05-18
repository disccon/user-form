import db from '../db'

export const getUsersIndexDB = () => db.usersDB.toArray(users => users)
