import queryString from 'query-string'

export const validateUsersUrl = search => {
  const valueQuery = queryString.parse(search)
  const { page, per_page } = valueQuery
  return search && (!page || !per_page || !(per_page > 0) || !(page > 0))
}
