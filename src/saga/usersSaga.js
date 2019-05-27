import {
  put, call, select, delay,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  FETCH_USERS__SUCCESS,
  FETCH_USERS__FAILURE,

  DELETE_USER__SUCCESS,
  DELETE_USER__FAILURE,

  SEARCHING_USERS__SUCCESS,
  SEARCHING_USERS__FAILURE,

  LOADING_INTERVAL__SUCCESS,
  LOADING_INTERVAL__FAILURE,
} from '../actions/actionUsers'
import db from '../db'
import { getUsersIndexDB } from '../helpers/getUsersIndexDB'

export function* fetchUsersSaga() {
  try {
    yield delay(500)
    const users = yield call(getUsersIndexDB)
    yield put({
      type: FETCH_USERS__SUCCESS,
      payload: {
        users,
        isLoading: false,
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
  const {
    id, currentPage, pagesCount, per_page
  } = action.payload
  try {
    db.usersDB.delete(id)
    const usersRedux = yield select(state => state.usersReducer.users)
    const users = usersRedux.filter(user => user.id !== id)
    const newPagesCount = Math.ceil((users.length) / per_page)
    if (newPagesCount < pagesCount && currentPage === pagesCount) {
      yield put(push({ pathname: '/users', search: `?page=${newPagesCount}&per_page=${per_page}` }))
      yield put({
        type: LOADING_INTERVAL__SUCCESS,
        payload: {
          isLoading: true,
        },
      })
      yield delay(500)
    }
    yield put({
      type: DELETE_USER__SUCCESS,
      payload: {
        users,
        isLoading: false,
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
        isLoading: true,
      },
    })
    yield delay(500)
    yield put({
      type: LOADING_INTERVAL__SUCCESS,
      payload: {
        isLoading: false,
      },
    })
  } catch (error) {
    yield put({
      type: SEARCHING_USERS__FAILURE,
      error,
    })
  }
}

export function* loadingIntervalSaga() {
  try {
    yield put({
      type: LOADING_INTERVAL__SUCCESS,
      payload: {
        isLoading: true,
      },
    })
    yield delay(500)
    yield put({
      type: LOADING_INTERVAL__SUCCESS,
      payload: {
        isLoading: false,
      },
    })
  } catch (error) {
    yield put({
      type: LOADING_INTERVAL__FAILURE,
      error,
    })
  }
}
