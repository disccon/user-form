export const FETCH_EDIT_USER = 'FETCH_EDIT_USER'
export const FETCH_EDIT_USER__SUCCESS = 'FETCH_EDIT_USER__SUCCESS'
export const FETCH_EDIT_USER__FAILURE = 'FETCH_EDIT_USER__FAILURE'

export const SAVE_CROPPER_AVATAR = 'SAVE_CROPPER_AVATAR'
export const SAVE_CROPPER_AVATAR__SUCCESS = 'SAVE_CROPPER_AVATAR__SUCCESS'
export const SAVE_CROPPER_AVATAR__FAILURE = 'SAVE_CROPPER_AVATAR__FAILURE'

export const CHANGE_AVATAR_ACCOUNT_EDITING = 'CHANGE_AVATAR_ACCOUNT_EDITING'
export const CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS = 'CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS'
export const CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE = 'CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE'

export const SAVE_EDIT_USER_DATA = 'SAVE_EDIT_USER_DATA'
export const SAVE_EDIT_USER_DATA__FAILURE = 'SAVE_EDIT_USER_DATA__FAILURE'

export const fetchEditUser = id => (
  {
    type: FETCH_EDIT_USER,
    payload: {
      id,
    },
  })

export const saveCropperAvatar = userAvatarIMGCropper => (
  {
    type: SAVE_CROPPER_AVATAR,
    payload: {
      userAvatarIMGCropper,
    },
  })

export const changeAvatarAccountEditing = (userAvatarIMGCropper, userAvatarIMG) => (
  {
    type: CHANGE_AVATAR_ACCOUNT_EDITING,
    payload: {
      userAvatarIMGCropper, userAvatarIMG,
    },
  })


export const saveEditUserData = (id, activeFormValue) => (
  {
    type: SAVE_EDIT_USER_DATA,
    payload: {
      id, activeFormValue,
    },
  })
