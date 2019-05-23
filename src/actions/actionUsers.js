export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS__SUCCESS = 'FETCH_USERS__SUCCESS'
export const FETCH_USERS__FAILURE = 'FETCH_USERS__FAILURE'

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER__SUCCESS = 'DELETE_USER__SUCCESS'
export const DELETE_USER__FAILURE = 'DELETE_USER__FAILURE'

export const SEARCHING_USERS = 'SEARCHING_USERS'
export const SEARCHING_USERS__SUCCESS = 'SEARCHING_USERS__SUCCESS'
export const SEARCHING_USERS__FAILURE = 'SEARCHING_USERS__FAILURE'

export const fetchUsers = () => ({
  type: FETCH_USERS,
})

export const deleteUser = id => (
  {
    type: DELETE_USER,
    payload: {
      id,
    },
  })

export const searchingUsers = filterUsers => (
  {
    type: SEARCHING_USERS,
    payload: {
      filterUsers,
    },
  })
