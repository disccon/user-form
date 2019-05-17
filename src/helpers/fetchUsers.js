import db from '../db'

export const fetchUsers = () => db.usersDB.toArray(users => users)