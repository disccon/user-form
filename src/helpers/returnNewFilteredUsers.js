import _ from 'lodash/core'

const filterUsersBlock = (user, nameFilter, valueInput, activeInput) => {
  if (activeInput === 'is') {
    return user[nameFilter].toLowerCase().includes(valueInput.toLowerCase())
      && valueInput.length === user[nameFilter].length
  }
  if (activeInput === 'start with') return user[nameFilter].toLowerCase().startsWith(valueInput.toLowerCase())
  if (activeInput === 'ends with') return user[nameFilter].toLowerCase().endsWith(valueInput.toLowerCase())
  if (activeInput === 'contains') return user[nameFilter].toLowerCase().includes(valueInput.toLowerCase())
  if (activeInput === 'does not contains') return !user[nameFilter].toLowerCase().includes(valueInput.toLowerCase())
  return 'error'
}

const filterUsersBlockData = (user, nameFilter, valueInput, activeInput) => {
  const mathFloorDate = user => Math.floor((new Date().getTime() - user[nameFilter].getTime()) / 1000 / 60 / 60 / 24)
  const mathFloorCalendar = (user, valueInputDate) => Math.floor((valueInputDate.getTime() - user[nameFilter].getTime())
    / 1000 / 60 / 60 / 24)
  if (activeInput === 'more than') return mathFloorDate(user) > valueInput
  if (activeInput === 'exactly') return mathFloorDate(user) === Number(valueInput)
  if (activeInput === 'less than') return mathFloorDate(user) < valueInput
  if (activeInput === 'after') return mathFloorCalendar(user, valueInput) < 0
  if (activeInput === 'on') return mathFloorCalendar(user, valueInput) === 0
  if (activeInput === 'before') return mathFloorCalendar(user, valueInput) > 0
  return 'error'
}

const filterUsersSkills = (user, nameFilter, valueInput, activeInput) => {
  const userSkills = skillsArr => skillsArr.filter(skill => _.isEqual(skill, valueInput))
  if (activeInput === 'is') return userSkills(user[nameFilter]).length >= 1
  if (activeInput === 'is not') return userSkills(user[nameFilter]).length === 0
  return 'error'
}

export const returnNewFilteredUsers = (users, allFiltersUsers) => {
  const {
    userNameFilterActive: userNameFilter, companyFilterActive: companyFilter,
    birthDateFilterActive: birthDateFilter, lastUpdateFilterActive: lastUpdateFilter,
    skillsFilterActive: skillsFilter, eventMatchAllFilters: matchAllFilters,
  } = allFiltersUsers
  if (matchAllFilters === 'all') {
    return users.filter(user => {
      if (userNameFilter) {
        if (!filterUsersBlock(user, 'userName', userNameFilter.valueInput, userNameFilter.activeInput)) {
          return false
        }
      }
      if (companyFilter) {
        if (!filterUsersBlock(user, 'company', companyFilter.valueInput, companyFilter.activeInput)) {
          return false
        }
      }
      if (birthDateFilter) {
        if (!filterUsersBlockData(user, 'birthDate', birthDateFilter.valueInput, birthDateFilter.activeInput)) {
          return false
        }
      }
      if (lastUpdateFilter) {
        if (!filterUsersBlockData(user, 'lastUpdate', lastUpdateFilter.valueInput, lastUpdateFilter.activeInput)) {
          return false
        }
      }
      if (skillsFilter) {
        if (!filterUsersSkills(user, 'skills', skillsFilter.valueInput, skillsFilter.activeInput)) {
          return false
        }
      }
      return true
    })
  } if (matchAllFilters === 'any') {
    return users.filter(user => {
      if (userNameFilter) {
        if (filterUsersBlock(user, 'userName', userNameFilter.valueInput, userNameFilter.activeInput)) {
          return true
        }
      }
      if (companyFilter) {
        if (filterUsersBlock(user, 'company', companyFilter.valueInput, companyFilter.activeInput)) {
          return true
        }
      }
      if (birthDateFilter) {
        if (filterUsersBlockData(user, 'birthDate', birthDateFilter.valueInput, birthDateFilter.activeInput)) {
          return true
        }
      }
      if (lastUpdateFilter) {
        if (filterUsersBlockData(user, 'lastUpdate', lastUpdateFilter.valueInput, lastUpdateFilter.activeInput)) {
          return true
        }
      }
      if (skillsFilter) {
        if (filterUsersSkills(user, 'skills', skillsFilter.valueInput, skillsFilter.activeInput)) {
          return true
        }
      }
      if (!userNameFilter && !companyFilter && !birthDateFilter && !lastUpdateFilter && !skillsFilter) {
        return true
      }
      return false
    })
  }
  return 'error'
}
