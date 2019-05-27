import queryString from 'query-string'

export const getQueryString = search => {
  const valueQuery = queryString.parse(search)
  const currentPage = Number(valueQuery.page) || 1
  const per_page = Number(valueQuery.per_page) || 10
  return { currentPage, per_page }
}
