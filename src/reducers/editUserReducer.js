import {

  FETCH_EDIT_USER__SUCCESS,
  FETCH_EDIT_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,

  SAVE_CHANGES_ACCOUNT_EDITING__FAILURE,
  SAVE_CHANGES_PROFILE_EDITING__FAILURE,
  SAVE_CHANGES_CONTACTS_EDITING__FAILURE,
  SAVE_CHANGES_CAPABILITIES_EDITING__FAILURE,
} from '../actions/actionEditUser'

export default function editUserReducer(state = { editUser: {} }, action) {
  switch (action.type) {
    case FETCH_EDIT_USER__SUCCESS: {
      return {
        ...state,
        editUser: action.payload.editUser,
        error: undefined,
      }
    }
    case FETCH_EDIT_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS: {
      return {
        ...state,
        editUser: {
          ...state.editUser,
          userSRCAvatarIMG: action.payload.userSRCAvatarIMG,
        },
        error: undefined,
      }
    }
    case CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CHANGES_ACCOUNT_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }
    case SAVE_CHANGES_PROFILE_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }
    case SAVE_CHANGES_CONTACTS_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }
    case SAVE_CHANGES_CAPABILITIES_EDITING__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
