import {
  USER_EDIT_STATE__SUCCESS,
  USER_EDIT_STATE__FAILURE,

  SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  SAVE_AVATAR_ACCOUNT_EDITING__FAILURE,

  ACCOUNT_EDITING_SAVE__FAILURE,
  PROFILE_EDITING_SAVE__FAILURE,
  CONTACTS_EDITING_SAVE__FAILURE,
  CAPABILITIES_EDITING_SAVE__FAILURE,
} from '../Actions'


export default function listUsersReducer(state = { editUser: {} }, action) {
  switch (action.type) {
    case USER_EDIT_STATE__SUCCESS: {
      return {
        ...state,
        editUser: action.payload.editUser,
        error: undefined,
      }
    }
    case USER_EDIT_STATE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_AVATAR_ACCOUNT_EDITING__SUCCESS: {
      return {
        ...state,
        editUser: {
          ...state.editUser,
          userSRCAvatarIMG: action.payload.userSRCAvatarIMG,
        },
        error: undefined,
      }
    }
    case SAVE_AVATAR_ACCOUNT_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case ACCOUNT_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }
    case PROFILE_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }
    case CONTACTS_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }
    case CAPABILITIES_EDITING_SAVE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    default:
      return state
  }
}
