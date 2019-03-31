import {
  put, delay, cancel, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'


import {
  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,
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
        userName, password, repeatPassword, userAvatarIMGUrl, },
    })
  } catch (error) {
    yield put({
      type: FORWARD_ACCOUNT__FAILURE,
      error,
    })
  }
}

