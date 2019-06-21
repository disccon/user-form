export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS__LOADING = 'FETCH_USERS__LOADING'
export const FETCH_USERS__SUCCESS = 'FETCH_USERS__SUCCESS'
export const FETCH_USERS__NOHAVE_USERS = 'FETCH_USERS__NOHAVE_USERS'
export const FETCH_USERS__FAILURE = 'FETCH_USERS__FAILURE'

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER__LOADING = 'DELETE_USER__LOADING'
export const DELETE_USER__SUCCESS = 'DELETE_USER__SUCCESS'
export const DELETE_USER__FAILURE = 'DELETE_USER__FAILURE'

export const SWAP_USERS = 'SWAP_USERS'
export const SWAP_USERS__SUCCESS = 'SWAP_USERS__SUCCESS'
export const SWAP_USERS__FAILURE = 'SWAP_USERS__FAILURE'

export const SHOW_BUTTON_FILTER = 'SHOW_BUTTON_FILTER'
export const SHOW_BUTTON_FILTER__SUCCESS = 'SHOW_BUTTON_FILTER__SUCCESS'
export const SHOW_BUTTON_FILTER__FAILURE = 'SHOW_BUTTON_FILTER__FAILURE'

export const APPLY_FILTER_FILTER_USERS = 'APPLY_FILTER_FILTER_USERS'
export const APPLY_FILTER_FILTER_USERS__SUCCESS = 'APPLY_FILTER_FILTER_USERS__SUCCESS'
export const APPLY_FILTER_FILTER_USERS__FAILURE = 'APPLY_FILTER_FILTER_USERS__FAILURE'

export const SAVE_FILTER_USERS = 'SAVE_FILTER_USERS'
export const SAVE_FILTER_USERS__SUCCESS = 'SAVE_FILTER_USERS__SUCCESS'
export const SAVE_FILTER_USERS__FAILURE = 'SAVE_FILTER_USERS__FAILURE'

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

export const swapUsers = (oldIndex, newIndex) => (
  {
    type: SWAP_USERS,
    payload: {
      oldIndex, newIndex,
    },
  })

export const showButtonFilter = nameFilter => (
  {
    type: SHOW_BUTTON_FILTER,
    payload: {
      nameFilter,
    },
  })

export const applyFilterUsers = (eventName, nameFilter, valueInput, activeInput) => (
  {
    type: APPLY_FILTER_FILTER_USERS,
    payload: {
      eventName, nameFilter, valueInput, activeInput,
    },
  })

export const saveFiltersUsers = () => (
  { type: SAVE_FILTER_USERS })
