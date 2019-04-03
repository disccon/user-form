import {
  put, delay, cancel, select,
} from 'redux-saga/effects'
import { push } from 'connected-react-router'


import {
  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  SAVE_BIRTH_DATE__SUCCESS,
  SAVE_BIRTH_DATE__FAILURE,

  SAVE_GENDER_INPUT__SUCCESS,
  SAVE_GENDER_INPUT__FAILURE,

  FORWARD_BACK_PROFILE__FORWARD,
  FORWARD_BACK_PROFILE__BACK,
  FORWARD_BACK_PROFILE__FAILURE,

  FORWARD_BACK_CONTACTS__FORWARD,
  FORWARD_BACK_CONTACTS__BACK,
  FORWARD_BACK_CONTACTS__FAILURE,

  DELETE_ADD_FIELD_PHONE__ADD,
  DELETE_ADD_FIELD_PHONE__DELETE,
  DELETE_ADD_FIELD_PHONE__FAILURE,

  SAVE_SELECT_LANGUAGE__SUCCESS,
  SAVE_SELECT_LANGUAGE__FAILURE,
} from '../Actions'


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

export function* forwardBackProfileSaga(action) {
  const { forwardBack, firstName, lastName, email, address, } = action.payload
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
        firstName, lastName, email, address,
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
  const { forwardBack, company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3, } = action.payload
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
        forwardBack, company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3,
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

export function* saveSelectLanguageSaga(action) {
  const { selectValue } = action.payload
  try {
    yield put({
        type: SAVE_SELECT_LANGUAGE__SUCCESS,
        payload: {
          selectValue
        },
      })

  } catch (error) {
    yield put({
      type: SAVE_SELECT_LANGUAGE__FAILURE,
      error,
    })
  }
}
