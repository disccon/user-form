import { createSelector } from 'reselect/lib/index'
import queryString from 'query-string/index'

const users = props => props.users
const filter = props => props.filterUsers
const perPageReducer = props => props.per_page
const location = props => props.search


export const getFilterUsers = createSelector(
  [users, filter, perPageReducer, location],
  (usersRedux, searchUsers, perPage, search) => {
    const valueQuery = queryString.parse(search)
    const currentPage = Number(valueQuery.page) || 1
    const per_page = Number(valueQuery.per_page) || perPage
    const start = (currentPage - 1) * per_page
    if (searchUsers === '') {
      const users = usersRedux.slice(start, start + per_page)
      const pagesCount = Math.ceil(usersRedux.length / per_page)
      return {
        users, total: usersRedux.length, currentPage, pagesCount, per_page,
      }
    }
    const filterUsers = usersRedux.filter(user => `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchUsers.toLowerCase()))
    const users = filterUsers.slice(start, start + per_page)
    const pagesCount = Math.ceil(filterUsers.length / per_page)
    return {
      users, total: filterUsers.length, currentPage, pagesCount, per_page,
    }
  },
)
