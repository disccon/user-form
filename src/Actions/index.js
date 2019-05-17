export const CHANGE_QUESTION_STATE = 'CHANGE_QUESTION_STATE'
export const CHANGE_QUESTION_STATE__OPEN = 'CHANGE_QUESTION_STATE__OPEN'
export const CHANGE_QUESTION_STATE__CLOSE = 'CHANGE_QUESTION_STATE__CLOSE'
export const CHANGE_QUESTION_STATE__FAILURE = 'CHANGE_QUESTION_STATE__FAILURE'

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

export const BACK_CAPABILITIES = 'BACK_CAPABILITIES'
export const BACK_CAPABILITIES__SUCCESS = 'BACK_CAPABILITIES__SUCCESS'
export const BACK_CAPABILITIES__FAILURE = 'BACK_CAPABILITIES__FAILURE'

export const FORWARD_CAPABILITIES = 'FORWARD_CAPABILITIES'
export const FORWARD_CAPABILITIES__ADD_NEW_USER = 'FORWARD_BACK_CAPABILITIES__FORWARD__ADD_NEW_USER'
export const FORWARD_CAPABILITIES__FAILURE = 'FORWARD_CAPABILITIES__FAILURE'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USERS__SUCCESS = 'FETCH_USERS__SUCCESS'
export const FETCH_USERS__FAILURE = 'FETCH_USERS__FAILURE'

export const DELETE_USER = 'DELETE_USER'
export const DELETE_USER__SUCCESS = 'DELETE_USER__SUCCESS'
export const DELETE_USER__FAILURE = 'DELETE_USER__FAILURE'

export const SEARCHING_USERS = 'SEARCHING_USERS'
export const SEARCHING_USERS__SUCCESS = 'SEARCHING_USERS__SUCCESS'
export const SEARCHING_USERS__FAILURE = 'SEARCHING_USERS__FAILURE'

export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER__SUCCESS = 'CREATE_USER__SUCCESS'
export const CREATE_USER__FAILURE = 'CREATE_USER__FAILURE'

export const USER_EDIT_STATE = 'USER_EDIT_STATE'
export const USER_EDIT_STATE__SUCCESS = 'USER_EDIT_STATE__SUCCESS'
export const USER_EDIT_STATE__FAILURE = 'USER_EDIT_STATE__FAILURE'


export const SAVE_AVATAR_ACCOUNT_EDITING = 'SAVE_AVATAR_ACCOUNT_EDITING'
export const SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS = 'SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS'
export const SAVE_AVATAR_ACCOUNT_EDITING__FAILURE = 'SAVE_AVATAR_ACCOUNT_EDITING__FAILURE'

export const ACCOUNT_EDITING_SAVE = 'ACCOUNT_EDITING_SAVE'
export const ACCOUNT_EDITING_SAVE__FAILURE = 'ACCOUNT_EDITING_SAVE__FAILURE'

export const PROFILE_EDITING_SAVE = 'PROFILE_EDITING_SAVE'
export const PROFILE_EDITING_SAVE__FAILURE = 'PROFILE_EDITING_SAVE__FAILURE'

export const CONTACTS_EDITING_SAVE = 'CONTACTS_EDITING_SAVE'
export const CONTACTS_EDITING_SAVE__FAILURE = 'CONTACTS_EDITING_SAVE__FAILURE'

export const DELETE_FIELD_PHONE_EDITING = 'DELETE_FIELD_PHONE_EDITING'
export const DELETE_FIELD_PHONE_EDITING__ADD = 'DELETE_FIELD_PHONE_EDITING__ADD'
export const DELETE_FIELD_PHONE_EDITING__DELETE = 'DELETE_FIELD_PHONE_EDITING__DELETE'
export const DELETE_FIELD_PHONE_EDITING__FAILURE = 'DELETE_FIELD_PHONE_EDITING__FAILURE'

export const CAPABILITIES_EDITING_SAVE = 'CAPABILITIES_EDITING_SAVE'
export const CAPABILITIES_EDITING_SAVE__FAILURE = 'CAPABILITIES_EDITING_SAVE__FAILURE'

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

export const deleteAddFieldPhone = deleteAddField => (
  {
    type: DELETE_ADD_FIELD_PHONE,
    payload: {
      deleteAddField,
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


export const fetchUsersDB = () => ({
  type: FETCH_USERS,
})

export const deleteUser = (id, currentPage, total, per_page) => (
  {
    type: DELETE_USER,
    payload: {
      id, currentPage, total, per_page,
    },
  })

export const searchingUsers = filterUsers => (
  {
    type: SEARCHING_USERS,
    payload: {
      filterUsers,
    },
  })


export const createUser = () => (
  { type: CREATE_USER })


export const userEditState = (editUser, users) => (
  {
    type: USER_EDIT_STATE,
    payload: {
      editUser, users,
    },
  })


export const saveAvatarAccountEditing = (userSRCAvatarIMG, id) => (
  {
    type: SAVE_AVATAR_ACCOUNT_EDITING,
    payload: {
      userSRCAvatarIMG, id,
    },
  })

export const accountEditingSave = (userName, password, repeatPassword, userSRCAvatarIMG, id) => (
  {
    type: ACCOUNT_EDITING_SAVE,
    payload: {
      userName, password, repeatPassword, userSRCAvatarIMG, id,
    },
  })


export const profileEditingSave = (firstName, lastName, birthDate, email, address, gender, id) => (
  {
    type: PROFILE_EDITING_SAVE,
    payload: {
      firstName, lastName, birthDate, email, address, gender, id,
    },
  })


export const deleteFieldPhoneEditing = (deleteAddField, id) => (
  {
    type: DELETE_FIELD_PHONE_EDITING,
    payload: {
      deleteAddField, id,
    },
  })


export const contactsEditingSave = (company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
  phoneN1, phoneN2, phoneN3, id) => (
  {
    type: CONTACTS_EDITING_SAVE,
    payload: {
      company,
      githubLink,
      facebookLink,
      selectLanguage,
      fax,
      phoneArray,
      phoneN1,
      phoneN2,
      phoneN3,
      id,
    },
  })

export const capabilitiesEditingSave = (selectSkills, textareaField, checkboxArt, checkboxSport,
  checkboxJustWant, checkboxFemale, checkboxGuitar, checkboxWtf, id) => (
  {
    type: CAPABILITIES_EDITING_SAVE,
    payload: {
      selectSkills,
      textareaField,
      checkboxArt,
      checkboxSport,
      checkboxJustWant,
      checkboxFemale,
      checkboxGuitar,
      checkboxWtf,
      id,
    },
  })
