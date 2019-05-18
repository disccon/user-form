export const FETCH_EDIT_USER = 'FETCH_EDIT_USER'
export const FETCH_EDIT_USER__SUCCESS = 'FETCH_EDIT_USER__SUCCESS'
export const FETCH_EDIT_USER__FAILURE = 'FETCH_EDIT_USER__FAILURE'

export const CHANGE_AVATAR_ACCOUNT_EDITING = 'CHANGE_AVATAR_ACCOUNT_EDITING'
export const CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS = 'CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS'
export const CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE = 'CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE'

export const SAVE_CHANGES_ACCOUNT_EDITING = 'SAVE_CHANGES_ACCOUNT_EDITING'
export const SAVE_CHANGES_ACCOUNT_EDITING__FAILURE = 'SAVE_CHANGES_ACCOUNT_EDITING__FAILURE'

export const SAVE_CHANGES_PROFILE_EDITING = 'SAVE_CHANGES_PROFILE_EDITING'
export const SAVE_CHANGES_PROFILE_EDITING__FAILURE = 'SAVE_CHANGES_PROFILE_EDITING__FAILURE'

export const SAVE_CHANGES_CONTACTS_EDITING = 'SAVE_CHANGES_CONTACTS_EDITING'
export const SAVE_CHANGES_CONTACTS_EDITING__FAILURE = 'SAVE_CHANGES_CONTACTS_EDITING__FAILURE'

export const DELETE_FIELD_PHONE_EDITING = 'DELETE_FIELD_PHONE_EDITING'
export const DELETE_FIELD_PHONE_EDITING__ADD = 'DELETE_FIELD_PHONE_EDITING__ADD'
export const DELETE_FIELD_PHONE_EDITING__DELETE = 'DELETE_FIELD_PHONE_EDITING__DELETE'
export const DELETE_FIELD_PHONE_EDITING__FAILURE = 'DELETE_FIELD_PHONE_EDITING__FAILURE'

export const SAVE_CHANGES_CAPABILITIES_EDITING = 'SAVE_CHANGES_CAPABILITIES_EDITING'
export const SAVE_CHANGES_CAPABILITIES_EDITING__FAILURE = 'SAVE_CHANGES_CAPABILITIES_EDITING__FAILURE'

export const fetchEditUser = id => (
  {
    type: FETCH_EDIT_USER,
    payload: {
      id,
    },
  })


export const changeAvatarAccountEditing = userSRCAvatarIMG => (
  {
    type: CHANGE_AVATAR_ACCOUNT_EDITING,
    payload: {
      userSRCAvatarIMG,
    },
  })

export const saveChangesAccountEditing = (userName, password, repeatPassword, userSRCAvatarIMG, id) => (
  {
    type: SAVE_CHANGES_ACCOUNT_EDITING,
    payload: {
      userName, password, repeatPassword, userSRCAvatarIMG, id,
    },
  })


export const saveChangesProfileEditing = (firstName, lastName, birthDate, email, address, gender, id) => (
  {
    type: SAVE_CHANGES_PROFILE_EDITING,
    payload: {
      firstName, lastName, birthDate, email, address, gender, id,
    },
  })


export const deleteFieldPhoneEditing = (deleteAddField, phoneN1Form, phoneN2Form, phoneN3Form) => (
  {
    type: DELETE_FIELD_PHONE_EDITING,
    payload: {
      deleteAddField, phoneN1Form, phoneN2Form, phoneN3Form,
    },
  })

export const saveChangesContactsEditing = (company, githubLink, facebookLink, selectLanguage, fax, phoneArray,
  phoneN1, phoneN2, phoneN3, id) => (
  {
    type: SAVE_CHANGES_CONTACTS_EDITING,
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

export const saveChangesCapabilitiesEditing = (selectSkills, textareaField, checkboxArt, checkboxSport,
  checkboxJustWant, checkboxFemale, checkboxGuitar, checkboxWtf, id) => (
  {
    type: SAVE_CHANGES_CAPABILITIES_EDITING,
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
