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

export const saveChangesContactsEditing = (company, githubLink, facebookLink, selectLanguage, fax, phoneArray, id) => (
  {
    type: SAVE_CHANGES_CONTACTS_EDITING,
    payload: {
      company,
      githubLink,
      facebookLink,
      selectLanguage,
      fax,
      phoneArray,
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
