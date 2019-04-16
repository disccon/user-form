import {
  put, delay, cancel, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'


import {
  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  FORWARD_BACK_PROFILE__FORWARD,
  FORWARD_BACK_PROFILE__BACK,
  FORWARD_BACK_PROFILE__FAILURE,

  FORWARD_BACK_CONTACTS__FORWARD,
  FORWARD_BACK_CONTACTS__BACK,
  FORWARD_BACK_CONTACTS__FAILURE,

  DELETE_ADD_FIELD_PHONE__ADD,
  DELETE_ADD_FIELD_PHONE__DELETE,
  DELETE_ADD_FIELD_PHONE__FAILURE,

  FORWARD_BACK_CAPABILITIES__FORWARD,
  FORWARD_BACK_CAPABILITIES__BACK,
  FORWARD_BACK_CAPABILITIES__FAILURE,

  EDIT_USER__SUCCESS,
  EDIT_USER__FAILURE,
} from '../Actions'

export function* continueUserSaga(action) {
  const { isContinue } = action.payload
  try {
    if(isContinue){
      yield put({
        type: CONTINUE_USER__CONTINUE,
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


export function* saveUserSRCAvatarIMGSaga(action) {
  const { userSRCAvatarIMG } = action.payload
  try {
    yield put({
      type: SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
      payload: {
        userSRCAvatarIMG,
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_USER_SRC_AVATAR_IMG__FAILURE,
      error,
    })
  }
}



export function* forwardAccountSaga(action) {
  const {
    userName, password, repeatPassword,
  } = action.payload
  try {
    yield put(push('/Profile'))
    yield put({
      type: FORWARD_ACCOUNT__SUCCESS,
      payload: {
        userName, password, repeatPassword,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_ACCOUNT__FAILURE,
      error,
    })
  }
}



export function* forwardBackProfileSaga(action) {
  const { forwardBack, firstName, lastName, birthDate, email, address, gender } = action.payload
  try {
    let actionType
    if (forwardBack === 'back') {
      actionType = FORWARD_BACK_PROFILE__BACK
      yield put(push('/'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_PROFILE__FORWARD
      yield put(push('/Contacts'))
    }
    yield put({
      type: actionType,
      payload: {
        firstName, lastName, birthDate, email, address, gender,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_BACK_PROFILE__FAILURE,
      error,
    })
  }
}

export function* forwardBackContactsSaga(action) {
  const { forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneN1, phoneN2, phoneN3, } = action.payload
  try {
    let actionType
    if (forwardBack === 'back') {
      actionType = FORWARD_BACK_CONTACTS__BACK
      yield put(push('/Profile'))
    } else if (forwardBack === 'forward') {
      actionType = FORWARD_BACK_CONTACTS__FORWARD
      yield put(push('/Capabilities'))
    }
    yield put({
      type: actionType,
      payload: {
        forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneN1, phoneN2, phoneN3,
      },
    })
  } catch (error) {
    yield put({
      type: FORWARD_BACK_CONTACTS__FAILURE,
      error,
    })
  }
}



export function* deleteAddFieldPhoneSaga(action) {
  const quantityPhoneField = yield select(state => state.newUser.quantityPhoneField)
  const { deleteAddField, } = action.payload
  try {
    if(deleteAddField === 'add') {
      yield put({
        type:  DELETE_ADD_FIELD_PHONE__ADD,
        payload: {
          quantityPhoneField: quantityPhoneField + 1,
        },
      })
    } else if (deleteAddField === 'delete') {
    yield put({
      type: DELETE_ADD_FIELD_PHONE__DELETE,
      payload: {
        quantityPhoneField: quantityPhoneField - 1,
      },
    })}
  } catch (error) {
    yield put({
      type: DELETE_ADD_FIELD_PHONE__FAILURE,
      error,
    })
  }
}


export function* forwardBackCapabilitiesSaga(action) {
  const { forwardBack, selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
    checkboxFemale, checkboxGuitar, checkboxWtf } = action.payload
  const newUser = yield select(state => state.newUser)
  const listUsers = yield select(state => state.listUsers)
  try {
    if (forwardBack === 'forward') {
      yield put(push('/ListUsers'))
      yield put({
        type: FORWARD_BACK_CAPABILITIES__FORWARD,
        payload: {
          ...newUser,
          id: listUsers.users[listUsers.users.length -1].id + 1,
          selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
          checkboxFemale, checkboxGuitar, checkboxWtf,
        },
      })
    } else if (forwardBack === 'back') {
      yield put(push('/Contacts'))
          yield put({
            type: FORWARD_BACK_CAPABILITIES__BACK,
            payload: {
              selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
              checkboxFemale, checkboxGuitar, checkboxWtf,
            },
          })
    }
  } catch (error) {
    yield put({
      type: FORWARD_BACK_CAPABILITIES__FAILURE,
      error,
    })
  }
}



export function* editUserSaga(action) {
  const { user } = action.payload
  try {
      yield put(push('/EditUser'))
      yield put({
        type: EDIT_USER__SUCCESS,
        payload: {...user,
          isQuestion: false,
        }
        ,
      })
  } catch (error) {
    yield put({
      type: EDIT_USER__FAILURE,
      error,
    })
  }
}
