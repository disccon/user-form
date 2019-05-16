import db from '../db'

export const fetchUsers = (currentPage, per_page) => {
  const start = (currentPage - 1) * per_page
  return db.usersDB.toArray(usersDB => (
    {
      users: usersDB.slice(start, start + per_page),
      total: usersDB.length,
    }
  ))
}
