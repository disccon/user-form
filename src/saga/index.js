import { takeLatest, all } from 'redux-saga/effects'
import {
  continueUserSaga,
  saveUserSRCAvatarIMGSaga,
  forwardAccountSaga,
  saveBirthDateSaga,
  forwardBackProfileSaga,
  forwardBackContactsSaga,
  deleteAddFieldPhoneSaga,
  saveSelectLanguageSaga,
  saveSelectSkillsSaga,
  saveTextareaFieldSaga,

  saveCheckboxArtSaga,
  saveCheckboxSportSaga,
  saveCheckboxJustWantSaga,
  saveCheckboxFemaleSaga,
  saveCheckboxGuitarSaga,
  saveCheckboxWtfSaga,
  forwardCapabilitiesSaga,
} from './saga'



import {
  CONTINUE_USER,
  SAVE_USER_SRC_AVATAR_IMG,
  FORWARD_ACCOUNT,
  SAVE_BIRTH_DATE,
  FORWARD_BACK_PROFILE,
  FORWARD_BACK_CONTACTS,
  DELETE_ADD_FIELD_PHONE,
  SAVE_SELECT_LANGUAGE,
  SAVE_SELECT_SKILLS,
  SAVE_TEXTAREA_FIELD,

  SAVE_CHECKBOX_ART,
  SAVE_CHECKBOX_SPORT,
  SAVE_CHECKBOX_JUSTWANT,
  SAVE_CHECKBOX_FEMALE,
  SAVE_CHECKBOX_GUITAR,
  SAVE_CHECKBOX_WTF,
  FORWARD_CAPABILITIES,
} from '../Actions'


export default function* rootSaga() {
  yield all([
    takeLatest(CONTINUE_USER, continueUserSaga),
    takeLatest(SAVE_USER_SRC_AVATAR_IMG, saveUserSRCAvatarIMGSaga),
    takeLatest(FORWARD_ACCOUNT, forwardAccountSaga),
    takeLatest(SAVE_BIRTH_DATE, saveBirthDateSaga),
    takeLatest(FORWARD_BACK_PROFILE, forwardBackProfileSaga),
    takeLatest(FORWARD_BACK_CONTACTS, forwardBackContactsSaga),
    takeLatest(DELETE_ADD_FIELD_PHONE, deleteAddFieldPhoneSaga),
    takeLatest(SAVE_SELECT_LANGUAGE, saveSelectLanguageSaga),
    takeLatest(SAVE_SELECT_SKILLS, saveSelectSkillsSaga),
    takeLatest(SAVE_TEXTAREA_FIELD, saveTextareaFieldSaga),

    takeLatest(SAVE_CHECKBOX_ART, saveCheckboxArtSaga),
    takeLatest(SAVE_CHECKBOX_SPORT, saveCheckboxSportSaga),
    takeLatest(SAVE_CHECKBOX_JUSTWANT, saveCheckboxJustWantSaga),
    takeLatest(SAVE_CHECKBOX_FEMALE, saveCheckboxFemaleSaga),
    takeLatest(SAVE_CHECKBOX_GUITAR, saveCheckboxGuitarSaga),
    takeLatest(SAVE_CHECKBOX_WTF, saveCheckboxWtfSaga),
    takeLatest(SAVE_CHECKBOX_WTF, saveCheckboxWtfSaga),
    takeLatest(FORWARD_CAPABILITIES, forwardCapabilitiesSaga),
  ])
}
