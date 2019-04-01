import {
  put, delay, cancel, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'


import {
  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  SAVE_BIRTH_DATE__SUCCESS,
  SAVE_BIRTH_DATE__FAILURE,

  SAVE_GENDER_INPUT__SUCCESS,
  SAVE_GENDER_INPUT__FAILURE,
} from '../Actions'


export function* forwardAccountSaga(action) {
  const {
    userName, password, repeatPassword, userAvatarIMGUrl,
  } = action.payload
  try {
    yield put(push('/Profile'))
    yield put({
      type: FORWARD_ACCOUNT__SUCCESS,
      payload: {
        userName, password, repeatPassword, userAvatarIMGUrl,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_ACCOUNT__FAILURE,
      error,
    })
  }
}

export function* saveBirthDateSaga(action) {
  const { birthDate, } = action.payload
  try {
    yield put({
      type: SAVE_BIRTH_DATE__SUCCESS,
      payload: {
        birthDate,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_BIRTH_DATE__FAILURE,
      error,
    })
  }
}



export function* saveGenderInputSaga(action) {
  const { gender, } = action.payload
  try {
    yield put({
      type: SAVE_GENDER_INPUT__SUCCESS,
      payload: {
        gender,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_GENDER_INPUT__FAILURE,
      error,
    })
  }
}
