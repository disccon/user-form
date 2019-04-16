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

export const SAVE_BIRTH_DATE = 'SAVE_BIRTH_DATE'
export const SAVE_BIRTH_DATE__SUCCESS = 'SAVE_BIRTH_DATE__SUCCESS'
export const SAVE_BIRTH_DATE__FAILURE = 'SAVE_BIRTH_DATE__FAILURE'


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

export const SAVE_SELECT_LANGUAGE = 'SAVE_SELECT_LANGUAGE'
export const SAVE_SELECT_LANGUAGE__SUCCESS = 'SAVE_SELECT_LANGUAGE__SUCCESS'
export const SAVE_SELECT_LANGUAGE__FAILURE = 'SAVE_SELECT_LANGUAGE__FAILURE'

export const SAVE_SELECT_SKILLS = 'SAVE_SELECT_SKILLS'
export const SAVE_SELECT_SKILLS__SUCCESS = 'SAVE_SELECT_SKILLS__SUCCESS'
export const SAVE_SELECT_SKILLS__FAILURE = 'SAVE_SELECT_SKILLS__FAILURE'

export const SAVE_TEXTAREA_FIELD = 'SAVE_TEXTAREA_FIELD'
export const SAVE_TEXTAREA_FIELD__SUCCESS = 'SAVE_TEXTAREA_FIELD__SUCCESS'
export const SAVE_TEXTAREA_FIELD__FAILURE = 'SAVE_TEXTAREA_FIELD__FAILURE'



export const SAVE_CHECKBOX_ART = 'SAVE_CHECKBOX_ART'
export const SAVE_CHECKBOX_ART__SUCCESS = 'SAVE_CHECKBOX_ART__SUCCESS'
export const SAVE_CHECKBOX_ART__FAILURE = 'SAVE_CHECKBOX_ART__FAILURE'

export const SAVE_CHECKBOX_SPORT = 'SAVE_CHECKBOX_SPORT'
export const SAVE_CHECKBOX_SPORT__SUCCESS = 'SAVE_CHECKBOX_SPORT__SUCCESS'
export const SAVE_CHECKBOX_SPORT__FAILURE = 'SAVE_CHECKBOX_SPORT__FAILURE'

export const SAVE_CHECKBOX_JUSTWANT = 'SAVE_CHECKBOX_JUSTWANT'
export const SAVE_CHECKBOX_JUSTWANT__SUCCESS = 'SAVE_CHECKBOX_JUSTWANT__SUCCESS'
export const SAVE_CHECKBOX_JUSTWANT__FAILURE = 'SAVE_CHECKBOX_JUSTWANT__FAILURE'

export const SAVE_CHECKBOX_FEMALE = 'SAVE_CHECKBOX_FEMALE'
export const SAVE_CHECKBOX_FEMALE__SUCCESS = 'SAVE_CHECKBOX_FEMALE__SUCCESS'
export const SAVE_CHECKBOX_FEMALE__FAILURE = 'SAVE_CHECKBOX_FEMALE__FAILURE'

export const SAVE_CHECKBOX_GUITAR = 'SAVE_CHECKBOX_GUITAR__GUITAR'
export const SAVE_CHECKBOX_GUITAR__SUCCESS = 'SAVE_CHECKBOX_GUITAR__SUCCESS'
export const SAVE_CHECKBOX_GUITAR__FAILURE = 'SAVE_CHECKBOX_GUITAR__FAILURE'

export const SAVE_CHECKBOX_WTF = 'SAVE_CHECKBOX_WTF__WTF'
export const SAVE_CHECKBOX_WTF__SUCCESS = 'SAVE_CHECKBOX_WTF__SUCCESS'
export const SAVE_CHECKBOX_WTF__FAILURE = 'SAVE_CHECKBOX_WTF__FAILURE'


export const FORWARD_CAPABILITIES = 'FORWARD_CAPABILITIES'
export const FORWARD_CAPABILITIES__SUCCESS = 'FORWARD_CAPABILITIES__SUCCESS'
export const FORWARD_CAPABILITIES__FAILURE = 'FORWARD_CAPABILITIES__FAILURE'


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

export const saveBirthDate = birthDate => (
  {
    type: SAVE_BIRTH_DATE,
    payload: {
      birthDate
    },
  })


export const forwardBackProfile = (forwardBack, firstName, lastName, email, address) => (
  {
    type: FORWARD_BACK_PROFILE,
    payload: {
      forwardBack, firstName, lastName, email, address
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


export const saveSelectLanguage = selectLanguage => (
  { type: SAVE_SELECT_LANGUAGE,
    payload: {
      selectLanguage,
    },})

export const saveSelectSkills = selectSkills => (
  { type: SAVE_SELECT_SKILLS,
    payload: {
      selectSkills,
    },})


export const saveTextareaField = textareaField => (
  { type: SAVE_TEXTAREA_FIELD,
    payload: {
      textareaField,
    },})



export const saveCheckboxArt = value => (
  { type: SAVE_CHECKBOX_ART,
    payload: {
      value,
    },})

export const saveCheckboxSport = value => (
  { type: SAVE_CHECKBOX_SPORT,
    payload: {
      value,
    },})

export const saveCheckboxJustWant = value => (
  { type: SAVE_CHECKBOX_JUSTWANT,
    payload: {
      value,
    },})

export const saveCheckboxFemale = value => (
  { type: SAVE_CHECKBOX_FEMALE,
    payload: {
      value,
    },})

export const saveCheckboxGuitar = value => (
  { type: SAVE_CHECKBOX_GUITAR,
    payload: {
      value,
    },})

export const saveCheckboxWtf = value => (
  { type: SAVE_CHECKBOX_WTF,
    payload: {
      value,
    },})

export const forwardCapabilities = value => (
  { type: FORWARD_CAPABILITIES,
    payload: {
      value,
    },})
