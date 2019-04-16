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

  SAVE_SELECT_SKILLS__SUCCESS,
  SAVE_SELECT_SKILLS__FAILURE,

  SAVE_TEXTAREA_FIELD__SUCCESS,
  SAVE_TEXTAREA_FIELD__FAILURE,


  SAVE_CHECKBOX_ART__SUCCESS,
  SAVE_CHECKBOX_ART__FAILURE,

  SAVE_CHECKBOX_SPORT__SUCCESS,
  SAVE_CHECKBOX_SPORT__FAILURE,

  SAVE_CHECKBOX_JUSTWANT__SUCCESS,
  SAVE_CHECKBOX_JUSTWANT__FAILURE,

  SAVE_CHECKBOX_FEMALE__SUCCESS,
  SAVE_CHECKBOX_FEMALE__FAILURE,

  SAVE_CHECKBOX_GUITAR__SUCCESS,
  SAVE_CHECKBOX_GUITAR__FAILURE,

  SAVE_CHECKBOX_WTF__SUCCESS,
  SAVE_CHECKBOX_WTF__FAILURE,

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
  const { selectLanguage } = action.payload
  try {
    yield put({
        type: SAVE_SELECT_LANGUAGE__SUCCESS,
        payload: {
          selectLanguage
        },
      })

  } catch (error) {
    yield put({
      type: SAVE_SELECT_LANGUAGE__FAILURE,
      error,
    })
  }
}

export function* saveSelectSkillsSaga(action) {
  const { selectSkills } = action.payload
  try {
    yield put({
      type: SAVE_SELECT_SKILLS__SUCCESS,
      payload: {
        selectSkills
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_SELECT_SKILLS__FAILURE,
      error,
    })
  }
}

export function* saveTextareaFieldSaga(action) {
  const { textareaField } = action.payload
  try {
    yield put({
      type: SAVE_TEXTAREA_FIELD__SUCCESS,
      payload: {
        textareaField
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_TEXTAREA_FIELD__FAILURE,
      error,
    })
  }
}




export function* saveCheckboxArtSaga(action) {
  const { value } = action.payload
  const checkboxArtState = yield select(state => state.newUser.checkboxArt)
  const checkboxArt = checkboxArtState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_ART__SUCCESS,
      payload: {
        checkboxArt
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_ART__FAILURE,
      error,
    })
  }
}



export function* saveCheckboxSportSaga(action) {
  const { value } = action.payload
  const checkboxSportState = yield select(state => state.newUser.checkboxSport)
  const checkboxSport = checkboxSportState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_SPORT__SUCCESS,
      payload: {
        checkboxSport
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_SPORT__FAILURE,
      error,
    })
  }
}

export function* saveCheckboxJustWantSaga(action) {
  const { value } = action.payload
  const checkboxJustWantState = yield select(state => state.newUser.checkboxJustWant)
  const checkboxJustWant = checkboxJustWantState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_JUSTWANT__SUCCESS,
      payload: {
        checkboxJustWant
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_JUSTWANT__FAILURE,
      error,
    })
  }
}


export function* saveCheckboxFemaleSaga(action) {
  const { value } = action.payload
  const checkboxFemaleState = yield select(state => state.newUser.checkboxFemale)
  const checkboxFemale = checkboxFemaleState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_FEMALE__SUCCESS,
      payload: {
        checkboxFemale
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_FEMALE__FAILURE,
      error,
    })
  }
}


export function* saveCheckboxGuitarSaga(action) {
  const { value } = action.payload
  const checkboxGuitarState = yield select(state => state.newUser.checkboxGuitar)
  const checkboxGuitar = checkboxGuitarState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_GUITAR__SUCCESS,
      payload: {
        checkboxGuitar
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_GUITAR__FAILURE,
      error,
    })
  }
}


export function* saveCheckboxWtfSaga(action) {
  const { value } = action.payload
  const checkboxWtfState = yield select(state => state.newUser.checkboxWtf)
  const checkboxWtf = checkboxWtfState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_WTF__SUCCESS,
      payload: {
        checkboxWtf
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_WTF__FAILURE,
      error,
    })
  }
}

export function* forwardCapabilitiesSaga(action) {
  const { value } = action.payload
  const checkboxWtfState = yield select(state => state.newUser)
  const checkboxWtf = checkboxWtfState ? false : value
  try {
    yield put({
      type: SAVE_CHECKBOX_WTF__SUCCESS,
      payload: {
        checkboxWtf
      },
    })
  } catch (error) {
    yield put({
      type: SAVE_CHECKBOX_WTF__FAILURE,
      error,
    })
  }
}

