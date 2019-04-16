export const CONTINUE_USER = 'CONTINUE_USER'
export const CONTINUE_USER__CONTINUE = 'CONTINUE_USER__CONTINUE'
export const CONTINUE_USER__CLOSE = 'CONTINUE_USER__CLOSE'
export const CONTINUE_USER__FAILURE = 'CONTINUE_USER__FAILURE'


export const SAVE_USER_SRC_AVATAR_IMG = 'SAVE_USER_SRC_AVATAR_IMG'
export const SAVE_USER_SRC_AVATAR_IMG__SUCCESS = 'SAVE_USER_SRC_AVATAR_IMG__SUCCESS'
export const SAVE_USER_SRC_AVATAR_IMG__FAILURE = 'SAVE_USER_SRC_AVATAR_IMG__FAILURE'

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


export const FORWARD_BACK_CAPABILITIES = 'FORWARD_CAPABILITIES'
export const FORWARD_BACK_CAPABILITIES__FORWARD = 'FORWARD_CAPABILITIES__FORWARD'
export const FORWARD_BACK_CAPABILITIES__BACK = 'FORWARD_CAPABILITIES__BACK'
export const FORWARD_BACK_CAPABILITIES__FAILURE = 'FORWARD_CAPABILITIES__FAILURE'


export const continueUser = isContinue => (
    {
        type: CONTINUE_USER,
        payload: {
            isContinue,
        },
    })

export const saveUserSRCAvatarIMG = userSRCAvatarIMG => (
  {
    type: SAVE_USER_SRC_AVATAR_IMG,
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
      forwardBack, firstName, lastName, birthDate, email, address, gender
    },
  })

export const forwardBackContacts = (forwardBack, company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3) => (
  {
    type: FORWARD_BACK_CONTACTS,
    payload: {
      forwardBack, company, githubLink, facebookLink, fax, phoneN1, phoneN2, phoneN3,
    },
  })

export const deleteAddFieldPhone = deleteAddField => (
  { type: DELETE_ADD_FIELD_PHONE,
    payload: {
      deleteAddField,
    },})



export const forwardBackCapabilities = (forwardBack, selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
    checkboxFemale, checkboxGuitar, checkboxWtf) => (
  { type: FORWARD_BACK_CAPABILITIES,
    payload: {
        forwardBack, selectSkills, textareaField, checkboxArt, checkboxSport, checkboxJustWant,
        checkboxFemale, checkboxGuitar, checkboxWtf
    },})
