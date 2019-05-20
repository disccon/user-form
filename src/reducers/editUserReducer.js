import {
  FETCH_EDIT_USER__SUCCESS,
  FETCH_EDIT_USER__FAILURE,

  CHANGE_AVATAR_ACCOUNT_EDITING__SUCCESS,
  CHANGE_AVATAR_ACCOUNT_EDITING__FAILURE,

  DELETE_FIELD_PHONE_EDITING__ADD,
  DELETE_FIELD_PHONE_EDITING__DELETE,
  DELETE_FIELD_PHONE_EDITING__FAILURE,

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

    case DELETE_FIELD_PHONE_EDITING__ADD: {
      return {
        ...state,
        editUser: {
          ...state.editUser,
          company: action.payload.company,
          githubLink: action.payload.githubLink,
          facebookLink: action.payload.facebookLink,
          selectLanguage: action.payload.selectLanguage,
          fax: action.payload.fax,
          phoneArray: action.payload.phoneArray,
          phoneN1: action.payload.phoneN1,
          phoneN2: action.payload.phoneN2,
          phoneN3: action.payload.phoneN3,
        },
        error: undefined,
      }
    }
    case DELETE_FIELD_PHONE_EDITING__DELETE: {
      return {
        ...state,
        editUser: {
          ...state.editUser,
          company: action.payload.company,
          githubLink: action.payload.githubLink,
          facebookLink: action.payload.facebookLink,
          selectLanguage: action.payload.selectLanguage,
          fax: action.payload.fax,
          phoneArray: action.payload.phoneArray,
          phoneN1: action.payload.phoneN1,
          phoneN2: action.payload.phoneN2,
          phoneN3: action.payload.phoneN3,
        },
        error: undefined,
      }
    }
    case DELETE_FIELD_PHONE_EDITING__FAILURE: {
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
