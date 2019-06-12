import {
  put, call, select, delay,
} from 'redux-saga/effects'
import arrayMove from 'array-move'
import {
  FETCH_USERS__LOADING,
  FETCH_USERS__SUCCESS,
  FETCH_USERS__NOHAVE_USERS,
  FETCH_USERS__FAILURE,

  DELETE_USER__LOADING,
  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  SWAP_USERS__SUCCESS,
  SWAP_USERS__FAILURE,

  SHOW_BUTTON_FILTER__SUCCESS,
  SHOW_BUTTON_FILTER__FAILURE,

  APPLY_FILTER_FILTER_USERS__SUCCESS,
  APPLY_FILTER_FILTER_USERS__FAILURE,

  SAVE_FILTER_USERS__SUCCESS,
  SAVE_FILTER_USERS__FAILURE,
} from '../actions/actionUsers'
import { getUsersIndexDB } from '../helpers/getUsersIndexDB'
import db from '../db'
import { returnNewFilteredUsers } from '../helpers/returnNewFilteredUsers'
import { getQueryString } from '../helpers/valueQuery'
import { getUsersFiltersIndexDB } from '../helpers/getUsersFiltersIndexDB'

export function* fetchUsersSaga(action) {
  const {
    currentPage, per_page, searchQuery,
  } = action.payload
  try {
    yield put({
      type: FETCH_USERS__LOADING,
      payload: {
        searchQuery,
        isLoading: true,
      },
    })
    yield delay(500)
    const users = yield select(state => state.usersReducer.newFilteredUsers)
    if (users.length > 0) {
      let filteredUsers
      let pagesCount
      const start = (currentPage - 1) * per_page
      if (searchQuery === '') {
        filteredUsers = users.slice(start, start + per_page)
        pagesCount = Math.ceil(users.length / per_page)
      } else {
        const newUsers = users.filter(user => `${user.firstName} ${user.lastName}`.toLowerCase()
          .includes(searchQuery.toLowerCase()))
        filteredUsers = newUsers.slice(start, start + per_page)
        pagesCount = Math.ceil(newUsers.length / per_page)
      }
      yield put({
        type: FETCH_USERS__SUCCESS,
        payload: {
          filteredUsers,
          pagesCount,
          currentPage,
          searchQuery,
          per_page,
          isLoading: false,
        },
      })
    } else {
      yield put({
        type: FETCH_USERS__NOHAVE_USERS,
        payload: {
          filteredUsers: [],
          pagesCount: 1,
          currentPage: 1,
          searchQuery,
          per_page,
          isLoading: false,
        },
      })
    }
  } catch (error) {
    yield put({
      type: FETCH_USERS__FAILURE,
      isLoading: false,
      error,
    })
  }
}

export function* deleteUserSaga(action) {
  const { id } = action.payload
  try {
    yield put({
      type: DELETE_USER__LOADING,
      payload: {
        isLoading: true,
      },
    })
    const deleteCount = yield call(() => db.usersDB.where({ id }).delete())
    if (deleteCount === 1) {
      yield delay(1000)
      const filteredUsersReducer = yield select(state => state.usersReducer.filteredUsers)
      const filteredUsers = filteredUsersReducer.filter(user => user.id !== id)
      yield put({
        type: DELETE_USER__SUCCESS,
        payload: {
          filteredUsers,
          isLoading: false,
        },
      })
    } else {
      yield put({
        type: DELETE_USER__FAILURE,
        payload: {
          isLoading: false,
          error: true,
        },
      })
    }
  } catch (error) {
    yield put({
      type: DELETE_USER__FAILURE,
      isLoading: false,
      error,
    })
  }
}

export function* swapUsersSaga(action) {
  const { oldIndex, newIndex } = action.payload
  try {
    const filteredUsersReducer = yield select(state => state.usersReducer.filteredUsers)
    const filteredUsers = arrayMove(filteredUsersReducer, oldIndex, newIndex)
    yield put({
      type: SWAP_USERS__SUCCESS,
      payload: {
        filteredUsers,
        isLoading: false,
      },
    })
  } catch (error) {
    yield put({
      type: SWAP_USERS__FAILURE,
      isLoading: false,
      error,
    })
  }
}

export function* showButtonFilterSaga(action) {
  const { nameFilter } = action.payload
  try {
    yield put({
      type: SHOW_BUTTON_FILTER__SUCCESS,
      payload: {
        [nameFilter]: true,
      },
    })
  } catch (error) {
    yield put({
      type: SHOW_BUTTON_FILTER__FAILURE,
      error,
    })
  }
}

export function* applyFilterUsersSaga(action) {
  const {
    eventName, nameFilter, valueInput, activeInput,
  } = action.payload
  try {
    const users = yield call(getUsersIndexDB)
    if (users.length > 0) {
      const eventMatchAllFilters = yield select(state => state.usersReducer.eventMatchAllFilters)
      const userNameFilterActive = yield select(state => state.usersReducer.userNameFilterActive)
      const companyFilterActive = yield select(state => state.usersReducer.companyFilterActive)
      const birthDateFilterActive = yield select(state => state.usersReducer.birthDateFilterActive)
      const lastUpdateFilterActive = yield select(state => state.usersReducer.lastUpdateFilterActive)
      const skillsFilterActive = yield select(state => state.usersReducer.skillsFilterActive)
      let allFiltersUsers
      if (eventName === 'fetchUsers') {
        allFiltersUsers = yield call(getUsersFiltersIndexDB)
      } else if (eventName === 'changeEventMatchFilters') {
        allFiltersUsers = {
          userNameFilterActive,
          companyFilterActive,
          birthDateFilterActive,
          lastUpdateFilterActive,
          skillsFilterActive,
          eventMatchAllFilters: nameFilter,
        }
      } else if (eventName === 'deleteFilter') {
        allFiltersUsers = {
          userNameFilterActive,
          companyFilterActive,
          birthDateFilterActive,
          lastUpdateFilterActive,
          skillsFilterActive,
          [`${nameFilter}FilterActive`]: false,
          [`${nameFilter}IsBoxShow`]: false,
          eventMatchAllFilters,
        }
        db.usersFiltersDB.update(0, {
          [`${nameFilter}FilterActive`]: false,
          [`${nameFilter}IsBoxShow`]: false,
        })
      } else if (eventName === 'applyFilter') {
        let buttonFilterValue
        if (nameFilter === 'userName' || nameFilter === 'company') {
          buttonFilterValue = `${activeInput}: ${valueInput}`
        } else if (nameFilter === 'birthDate' || nameFilter === 'lastUpdate') {
          if (typeof valueInput !== 'object') {
            buttonFilterValue = `${activeInput}: ${valueInput} days`
          } else if (typeof valueInput === 'object') {
            buttonFilterValue = `${activeInput}: ${valueInput.toLocaleDateString()}`
          }
        } else if (nameFilter === 'skills') {
          if (typeof valueInput !== 'object') {
            buttonFilterValue = `${activeInput}`
          } else if (typeof valueInput === 'object') {
            buttonFilterValue = `${activeInput}: ${valueInput.value}`
          }
        }
        allFiltersUsers = {
          userNameFilterActive,
          companyFilterActive,
          birthDateFilterActive,
          lastUpdateFilterActive,
          skillsFilterActive,
          [`${nameFilter}FilterActive`]: {
            valueInput,
            activeInput,
            buttonFilterValue,
          },
          eventMatchAllFilters,
        }
      }
      const newFilteredUsers = returnNewFilteredUsers(users, allFiltersUsers)
      yield put({
        type: FETCH_USERS__LOADING,
        payload: {
          isLoading: false,
        },
      })
      yield put({
        type: APPLY_FILTER_FILTER_USERS__SUCCESS,
        payload: {
          newFilteredUsers,
          ...allFiltersUsers,
          isLoading: true,
        },
      })
      yield delay(500)
      const search = yield select(state => state.router.location.search)
      const searchQuery = yield select(state => state.usersReducer.searchQuery)
      const queryString = getQueryString(search)
      yield fetchUsersSaga({
        payload: {
          currentPage: queryString.currentPage,
          per_page: queryString.per_page,
          searchQuery,
        },
      })
    }
  } catch (error) {
    yield put({
      type: APPLY_FILTER_FILTER_USERS__FAILURE,
      error,
    })
  }
}

export function* saveFiltersUsersSaga() {
  try {
    const eventMatchAllFilters = yield select(state => state.usersReducer.eventMatchAllFilters)
    const userNameFilterActive = yield select(state => state.usersReducer.userNameFilterActive)
    const companyFilterActive = yield select(state => state.usersReducer.companyFilterActive)
    const birthDateFilterActive = yield select(state => state.usersReducer.birthDateFilterActive)
    const lastUpdateFilterActive = yield select(state => state.usersReducer.lastUpdateFilterActive)
    const skillsFilterActive = yield select(state => state.usersReducer.skillsFilterActive)
    db.usersFiltersDB.update(0, {
      eventMatchAllFilters,
      userNameFilterActive,
      companyFilterActive,
      birthDateFilterActive,
      lastUpdateFilterActive,
      skillsFilterActive,
      userNameIsBoxShow: !!userNameFilterActive,
      companyIsBoxShow: !!companyFilterActive,
      birthDateIsBoxShow: !!birthDateFilterActive,
      lastUpdateIsBoxShow: !!lastUpdateFilterActive,
      skillsIsBoxShow: !!skillsFilterActive,
    })

    yield put({
      type: SAVE_FILTER_USERS__SUCCESS,
    })
  } catch (error) {
    yield put({
      type: SAVE_FILTER_USERS__FAILURE,
      error,
    })
  }
}
