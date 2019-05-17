import { createSelector } from 'reselect/lib/index'
import queryString from 'query-string/index'

const users = state => state.usersReducer.users
const filter = state => state.usersReducer.filterUsers
const perPage = state => state.usersReducer.per_page
const location = state => state.router.location.search

export const getFilterUsers = createSelector(
  [users, filter, perPage, location],
  (usersRedux, searchUsers, per_page, search) => {
    const valueQuery = queryString.parse(search)
    const currentPage = Number(valueQuery.page) || 1
    const start = (currentPage - 1) * per_page
    if (searchUsers === '') {
      const users = usersRedux.slice(start, start + per_page)
      const pagesCount = Math.ceil(usersRedux.length / per_page)
      return {
        users, total: usersRedux.length, currentPage, pagesCount,
      }
    }
    const filterUsers = usersRedux.filter(user => `${user.firstName} ${user.lastName}`.includes(searchUsers))
    const users = filterUsers.slice(start, start + per_page)
    const pagesCount = Math.ceil(filterUsers.length / per_page)
    return {
      users, total: filterUsers.length, currentPage, pagesCount,
    }
  },
)
