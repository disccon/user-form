import {

  FETCH_EDIT_USER__SUCCESS,
  FETCH_EDIT_USER__FAILURE,

  SAVE_CROPPER_AVATAR__SUCCESS,
  SAVE_CROPPER_AVATAR__FAILURE,

  CHANGE_AVATAR_ACCOUNT_EDIT__SUCCESS,
  CHANGE_AVATAR_ACCOUNT_EDIT__FAILURE,

  SAVE_EDIT_USER_DATA__FAILURE,
} from '../actions/actionEditUser'

export default function editUserReducer(state = { editUser: {} }, action) {
  switch (action.type) {
    case FETCH_EDIT_USER__SUCCESS: {
      return {
        ...state,
        editUser: { ...action.payload },
        error: undefined,
      }
    }
    case FETCH_EDIT_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CROPPER_AVATAR__SUCCESS: {
      return {
        ...state,
        editUser: {
          ...state.editUser,
          ...action.payload,
        },
        error: action.error,
      }
    }
    case SAVE_CROPPER_AVATAR__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case CHANGE_AVATAR_ACCOUNT_EDIT__SUCCESS: {
      return {
        ...state,
        editUser: {
          ...state.editUser,
          ...action.payload,
        },
        error: undefined,
      }
    }
    case CHANGE_AVATAR_ACCOUNT_EDIT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_EDIT_USER_DATA__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
