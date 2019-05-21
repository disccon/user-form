export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER__SUCCESS = 'CREATE_USER__SUCCESS'
export const CREATE_USER__FAILURE = 'CREATE_USER__FAILURE'

export const CHANGE_QUESTION_STATE = 'CHANGE_QUESTION_STATE'
export const CHANGE_QUESTION_STATE__OPEN = 'CHANGE_QUESTION_STATE__OPEN'
export const CHANGE_QUESTION_STATE__CLOSE = 'CHANGE_QUESTION_STATE__CLOSE'
export const CHANGE_QUESTION_STATE__FAILURE = 'CHANGE_QUESTION_STATE__FAILURE'

export const CONTINUE_USER = 'CONTINUE_USER'
export const CONTINUE_USER__CONTINUE = 'CONTINUE_USER__CONTINUE'
export const CONTINUE_USER__CLOSE = 'CONTINUE_USER__CLOSE'
export const CONTINUE_USER__FAILURE = 'CONTINUE_USER__FAILURE'

export const CHANGE_AVATAR_ACCOUNT = 'CHANGE_AVATAR_ACCOUNT'
export const CHANGE_AVATAR_ACCOUNT__SUCCESS = 'CHANGE_AVATAR_ACCOUNT__SUCCESS'
export const CHANGE_AVATAR_ACCOUNT__FAILURE = 'CHANGE_AVATAR_ACCOUNT__FAILURE'

export const FORWARD_ACCOUNT = 'FORWARD_ACCOUNT'
export const FORWARD_ACCOUNT__SUCCESS = 'FORWARD_ACCOUNT__SUCCESS'
export const FORWARD_ACCOUNT__FAILURE = 'FORWARD_ACCOUNT__FAILURE'

export const FORWARD_BACK_PROFILE = 'FORWARD_BACK_PROFILE'
export const FORWARD_BACK_PROFILE__FORWARD = 'FORWARD_BACK_PROFILE__FORWARD'
export const FORWARD_BACK_PROFILE__BACK = 'FORWARD_BACK_PROFILE__BACK'
export const FORWARD_BACK_PROFILE__FAILURE = 'FORWARD_BACK_PROFILE__FAILURE'

export const FORWARD_BACK_CONTACTS = 'FORWARD_BACK_CONTACTS'
export const FORWARD_BACK_CONTACTS__FORWARD = 'FORWARD_BACK_CONTACTS__FORWARD'
export const FORWARD_BACK_CONTACTS__BACK = 'FORWARD_BACK_CONTACTS__BACK'
export const FORWARD_BACK_CONTACTS__FAILURE = 'FORWARD_BACK_CONTACTS__FAILURE'

export const DELETE_ADD_FIELD_PHONE = 'DELETE_ADD_FIELD_PHONE_PHONE'
export const DELETE_ADD_FIELD_PHONE__ADD = 'DELETE_ADD_FIELD_PHONE__ADD'
export const DELETE_ADD_FIELD_PHONE__DELETE = 'DELETE_ADD_FIELD_PHONE__DELETE'
export const DELETE_ADD_FIELD_PHONE__FAILURE = 'DELETE_ADD_FIELD_PHONE__FAILURE'

export const BACK_CAPABILITIES = 'BACK_CAPABILITIES'
export const BACK_CAPABILITIES__SUCCESS = 'BACK_CAPABILITIES__SUCCESS'
export const BACK_CAPABILITIES__FAILURE = 'BACK_CAPABILITIES__FAILURE'

export const FORWARD_CAPABILITIES = 'FORWARD_CAPABILITIES'
export const FORWARD_CAPABILITIES__ADD_NEW_USER = 'FORWARD_BACK_CAPABILITIES__FORWARD__ADD_NEW_USER'
export const FORWARD_CAPABILITIES__FAILURE = 'FORWARD_CAPABILITIES__FAILURE'

export const createUser = () => (
  { type: CREATE_USER })

export const changeQuestionState = isQuestion => ({
  type: CHANGE_QUESTION_STATE,
  payload: {
    isQuestion,
  },
})

export const continueUser = isContinue => (
  {
    type: CONTINUE_USER,
    payload: {
      isContinue,
    },
  })

export const changeAvatarAccount = userSRCAvatarIMG => (
  {
    type: CHANGE_AVATAR_ACCOUNT,
    payload: {
      userSRCAvatarIMG,
    },
  })

export const forwardAccount = (userName, password, repeatPassword) => (
  {
    type: FORWARD_ACCOUNT,
    payload: {
      userName, password, repeatPassword,
    },
  })

export const forwardBackProfile = (forwardBack, firstName, lastName, birthDate, email, address, gender) => (
  {
    type: FORWARD_BACK_PROFILE,
    payload: {
      forwardBack, firstName, lastName, birthDate, email, address, gender,
    },
  })
export const forwardBackContacts = (forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
  phoneN1, phoneN2, phoneN3) => (
  {
    type: FORWARD_BACK_CONTACTS,
    payload: {
      forwardBack, company, githubLink, facebookLink, selectLanguage, fax, phoneArray, phoneN1, phoneN2, phoneN3,
    },
  })

export const deleteAddFieldPhone = (deleteAddField, company, githubLink, facebookLink, selectLanguage, fax,
  phoneArray, phoneN1, phoneN2, phoneN3) => (
  {
    type: DELETE_ADD_FIELD_PHONE,
    payload: {
      deleteAddField,
      company,
      githubLink,
      facebookLink,
      selectLanguage,
      fax,
      phoneArray,
      phoneN1,
      phoneN2,
      phoneN3,
    },
  })

export const backCapabilities = (selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
  checkboxFemale, checkboxGuitar, checkboxWtf) => (
  {
    type: BACK_CAPABILITIES,
    payload: {
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
    },
  })

export const forwardCapabilities = (selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
  checkboxFemale, checkboxGuitar, checkboxWtf) => (
  {
    type: FORWARD_CAPABILITIES,
    payload: {
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
    },
  })
