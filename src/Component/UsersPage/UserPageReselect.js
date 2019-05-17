import { createSelector } from 'reselect'

const users = state => state.usersReducer.users
const filter = state => state.usersReducer.searchUsers
const perPage = state => state.usersReducer.per_page
const currentPage = (state, props) => props

export const getfilterUsers = createSelector(
  [users, filter, perPage, currentPage],
  (usersRedux, searchUsers, per_page, page) => {
    const filterUsers = usersRedux.filter(user => `${user.firstName} ${user.lastName}`.includes(searchUsers))
    const start = (page - 1) * per_page
    const users = filterUsers.slice(start, start + per_page)
    return { users, total: filterUsers.length }
  },
)
