import {
  put, call, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  FETCH_EDIT_USER__SUCCESS,
  FETCH_EDIT_USER__FAILURE,

  SAVE_CROPPER_AVATAR__SUCCESS,
  SAVE_CROPPER_AVATAR__FAILURE,

  CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,

  SAVE_EDIT_USER_DATA__FAILURE,
} from '../actions/actionEditUser'
import db from '../db'
import { getEditUserIndexDB } from '../helpers/getEditUserIndexDB'

export function* fetchEditUserSaga(action) {
  const { id } = action.payload
  try {
    const editUser = yield call(getEditUserIndexDB, id)
    if (editUser) {
      yield put({
        type: FETCH_EDIT_USER__SUCCESS,
        payload: {
          editUser,
        },
      })
    } else {
      yield put(push('/not-found'))
    }
  } catch (error) {
    yield put(push('/not-found'))
    yield put({
      type: FETCH_EDIT_USER__FAILURE,
      error,
    })
  }
}

export function* saveCropperAvatarSaga(action) {
  const { userAvatarIMGCropper } = action.payload
  try {
    const pathname = yield select(state => state.router.location.pathname)
    const id = Number(pathname.slice(6))
    yield call(() => db.usersDB.update(id, {
      userAvatarIMGCropper,
      lastUpdate: new Date(),
    }))
    yield put({
      type: SAVE_CROPPER_AVATAR__SUCCESS,
      payload: {
        userAvatarIMGCropper,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CROPPER_AVATAR__FAILURE,
      error,
    })
  }
}

export function* changeAvatarAccountEditingSaga(action) {
  const { userAvatarIMGCropper, userAvatarIMG } = action.payload
  try {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
      payload: {
        userAvatarIMGCropper, userAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,
      error,
    })
  }
}

export function* saveEditUserDataSaga(action) {
  const { id, activeFormValue } = action.payload
  try {
    yield call(() => db.usersDB.update(id, {
      ...activeFormValue,
      lastUpdate: new Date(),
    }))
    yield put(push(`/user/${id}`))
  } catch (error) {
    yield put({
      type: SAVE_EDIT_USER_DATA__FAILURE,
      error,
    })
  }
}
