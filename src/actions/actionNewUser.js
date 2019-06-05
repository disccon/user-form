export const SAVE_NEW_USER_DATA = 'SAVE_NEW_USER_DATA'
export const SAVE_NEW_USER_DATA__SUCCESS = 'SAVE_NEW_USER_DATA__SUCCESS'
export const SAVE_NEW_USER_DATA__FAILURE = 'SAVE_NEW_USER_DATA__FAILURE'

export const FORWARD_CAPABILITIES = 'FORWARD_CAPABILITIES'
export const FORWARD_CAPABILITIES__ADD_NEW_USER = 'FORWARD_BACK_CAPABILITIES__FORWARD__ADD_NEW_USER'
export const FORWARD_CAPABILITIES__FAILURE = 'FORWARD_CAPABILITIES__FAILURE'

export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_USER__SUCCESS = 'CLEAR_USER__SUCCESS'
export const CLEAR_USER__FAILURE = 'CLEAR_USER__FAILURE'

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

export const saveNewUserData = activeFormValue => (
  {
    type: SAVE_NEW_USER_DATA,
    payload: {
      activeFormValue,
    },
  })

export const clearUser = () => (
  { type: CLEAR_USER })

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

export const changeAvatarAccount = (userAvatarIMGCropper, userAvatarIMG) => (
  {
    type: CHANGE_AVATAR_ACCOUNT,
    payload: {
      userAvatarIMG, userAvatarIMGCropper,
    },
  })

export const forwardCapabilities = activeFormValue => (
  {
    type: FORWARD_CAPABILITIES,
    payload: {
      activeFormValue,
    },
  })
