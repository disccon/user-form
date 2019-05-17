import {
  put, call, select,
} from 'redux-saga/effects'

import {
  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  SEARCHING_USERS__SUCCESS,
  SEARCHING_USERS__FAILURE,
} from '../actions'
import db from '../db'
import { fetchUsers } from '../helpers/fetchUsers'
import { push } from 'connected-react-router'

export function* fetchUsersDBSaga() {
  try {
    const users = yield call(fetchUsers)
    yield put({
      type: FETCH_USERS__SUCCESS,
      payload: {
        users,
      },
    })
  } catch (error) {
    yield put({
      type: FETCH_USERS__FAILURE,
      error,
    })
  }
}

export function* deleteUserSaga(action) {
  const { id, currentPage } = action.payload
  try {
    db.usersDB.delete(id)
    const usersRedux = yield select(state => state.usersReducer.users)
    const per_page = yield select(state => state.usersReducer.per_page)
    const users = usersRedux.filter(user => user.id !== id)
    const isPagesCountChange = Math.ceil(usersRedux.length / per_page) !== Math.ceil(users.length / per_page)
    const page = isPagesCountChange ? currentPage - 1 : currentPage
    if (isPagesCountChange) {
      yield put(push({ pathname: '/users', search: `?page=${page}&per_page=${per_page}` }))
    }
    yield put({
      type: DELETE_USER__SUCCESS,
      payload: {
        users,
      },
    })
  } catch (error) {
    yield put({
      type: DELETE_USER__FAILURE,
      error,
    })
  }
}


export function* searchingUsersSaga(action) {
  const { filterUsers } = action.payload
  try {
    yield put({
      type: SEARCHING_USERS__SUCCESS,
      payload: {
        filterUsers,
      },
    })
  } catch (error) {
    yield put({
      type: SEARCHING_USERS__FAILURE,
      error,
    })
  }
}
