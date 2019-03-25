import {
  put, delay, cancel, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'


import {
  CHANGE_NAME_TEXT_FIELD__SUCCESS,
  CHANGE_NAME_TEXT_FIELD__FAILURE,
} from '../Component/Actions'



export function* changeNameTextFieldSaga(action) {
  try {
    yield put({
      type: CHANGE_NAME_TEXT_FIELD__SUCCESS,
      payload: { textFieldName: action.payload.textFieldName },
    })
  } catch (error) {
    yield put({
      type: CHANGE_NAME_TEXT_FIELD__FAILURE,
      error,
    })
  }
}

