export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS__LOADING = 'FETCH_USERS__LOADING'
export const FETCH_USERS__SUCCESS = 'FETCH_USERS__SUCCESS'
export const FETCH_USERS__NOHAVE_USERS = 'FETCH_USERS__NOHAVE_USERS'
export const FETCH_USERS__FAILURE = 'FETCH_USERS__FAILURE'

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER__LOADING = 'DELETE_USER__LOADING'
export const DELETE_USER__SUCCESS = 'DELETE_USER__SUCCESS'
export const DELETE_USER__FAILURE = 'DELETE_USER__FAILURE'

export const fetchUsers = (currentPage, per_page, searchQuery) => ({
  type: FETCH_USERS,
  payload: {
    currentPage, per_page, searchQuery,
  },
})

export const deleteUser = id => (
  {
    type: DELETE_USER,
    payload: {
      id,
    },
  })
