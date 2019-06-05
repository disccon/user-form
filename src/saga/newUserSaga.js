import {
  put, select, call,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'
import {
  SAVE_NEW_USER_DATA__SUCCESS,
  SAVE_NEW_USER_DATA__FAILURE,

  CLEAR_USER__SUCCESS,
  CLEAR_USER__FAILURE,

  CHANGE_QUESTION_STATE__OPEN,
  CHANGE_QUESTION_STATE__CLOSE,
  CHANGE_QUESTION_STATE__FAILURE,

  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT__SUCCESS,
  CHANGE_AVATAR_ACCOUNT__FAILURE,

  FORWARD_CAPABILITIES__ADD_NEW_USER,
  FORWARD_CAPABILITIES__FAILURE,
} from '../actions/actionNewUser'
import { initialNewUserState } from '../stubs/initialNewUserState'
import db from '../db'

export function* saveNewUserDataSaga(action) {
  const { activeFormValue } = action.payload
  try {
    yield put({
      type: SAVE_NEW_USER_DATA__SUCCESS,
      payload: {
        ...activeFormValue,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_NEW_USER_DATA__FAILURE,
      error,
    })
  }
}

export function* clearUserSaga() {
  try {
    yield put({
      type: CLEAR_USER__SUCCESS,
      payload: {
        ...initialNewUserState,
      },
    })
  } catch (error) {
    yield put({
      type: CLEAR_USER__FAILURE,
      error,
    })
  }
}

export function* changeQuestionStateSaga(action) {
  const { isQuestion } = action.payload
  try {
    if (isQuestion) {
      yield put({
        type: CHANGE_QUESTION_STATE__CLOSE,
      })
    } else {
      yield put({
        type: CHANGE_QUESTION_STATE__OPEN,
        payload: {
          isQuestion: true,
        },
      })
    }
  } catch (error) {
    yield put({
      type: CHANGE_QUESTION_STATE__FAILURE,
      error,
    })
  }
}

export function* continueUserSaga(action) {
  const { isContinue } = action.payload
  try {
    if (isContinue) {
      const newUser = yield call(() => db.newUserDB.get(0))
      if (newUser.contactsFilled) {
        yield put(push('/capabilities'))
      } else if (newUser.profileFilled) {
        yield put(push('/contacts'))
      } else if (newUser.accountFilled) {
        yield put(push('/profile'))
      }
      yield put({
        type: CONTINUE_USER__CONTINUE,
        payload: {
          ...newUser,
        },
      })
    } else {
      yield put({
        type: CONTINUE_USER__CLOSE,
        payload: {
          isQuestion: false,
        },
      })
    }
  } catch (error) {
    yield put({
      type: CONTINUE_USER__FAILURE,
      error,
    })
  }
}

export function* changeAvatarAccountSaga(action) {
  const { userAvatarIMGCropper, userAvatarIMG } = action.payload
  try {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT__SUCCESS,
      payload: {
        userAvatarIMGCropper, userAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: CHANGE_AVATAR_ACCOUNT__FAILURE,
      error,
    })
  }
}

export function* forwardCapabilitiesSaga(action) {
  db.newUserDB.update(0, {
    ...initialNewUserState,
  })
  const { activeFormValue } = action.payload
  try {
    const newUser = yield select(state => state.newUser)
    delete newUser.isQuestion
    delete newUser.id
    delete newUser.error
    delete newUser.accountFilled
    delete newUser.profileFilled
    delete newUser.contactsFilled
    yield call(() => db.usersDB.add({
      ...newUser,
      ...activeFormValue,
      lastUpdate: new Date(),
    }))
    yield put({
      type: FORWARD_CAPABILITIES__ADD_NEW_USER,
      payload: {
        ...initialNewUserState,
      },
    })
  } catch
  (error) {
    yield put({
      type: FORWARD_CAPABILITIES__FAILURE,
      error,
    })
  }
}
