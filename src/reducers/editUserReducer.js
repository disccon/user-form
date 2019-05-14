import {
  USER_EDIT_STATE__SUCCESS,
  USER_EDIT_STATE__FAILURE,


} from '../Actions'


export default function listUsersReducer(state = { editUser: [] }, action) {
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


    default:
      return state
  }
}
