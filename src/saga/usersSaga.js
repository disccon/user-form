import {
  put, call, select, delay,
} from 'redux-saga/effects'
import {
  FETCH_USERS__LOADING,
  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

  DELETE_USER__LOADING,
  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,
} from '../actions/actionUsers'
import { getUsersIndexDB } from '../helpers/getUsersIndexDB'
import db from '../db'

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
    let filteredUsers
    let pagesCount
    const start = (currentPage - 1) * per_page
    let users = yield select(state => state.usersReducer.users)
    if (!users.length) {
      users = yield call(getUsersIndexDB)
    }
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
        users,
        filteredUsers,
        pagesCount,
        searchQuery,
        currentPage,
        per_page,
        isLoading: false,
      },
    })
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
    if (deleteCount === 0) {
      yield delay(1000)
      const usersReducer = yield select(state => state.usersReducer.users)
      const filteredUsersReducer = yield select(state => state.usersReducer.filteredUsers)
      const filteredUsers = filteredUsersReducer.filter(user => user.id !== id)
      const users = usersReducer.filter(user => user.id !== id)
      yield put({
        type: DELETE_USER__SUCCESS,
        payload: {
          users,
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
