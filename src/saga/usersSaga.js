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
  const { id } = action.payload
  try {
    db.usersDB.delete(id)
    const usersRedux = yield select(state => state.usersReducer.users)
    const users = usersRedux.filter(user => user.id !== id)
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
