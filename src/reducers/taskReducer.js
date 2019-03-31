import initialState from '../stubs/initialState'
import {
  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,
} from '../Actions'

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case FORWARD_ACCOUNT__SUCCESS: {
      return {
        ...state,
        newUser: {
          userName: action.payload.userName,
          password: action.payload.userName,
          repeatPassword: action.payload.repeatPassword,
          userAvatarIMGUrl: action.payload.userAvatarIMGUrl,
        },
        error: undefined,
      }
    }
    case FORWARD_ACCOUNT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    default:
      return state
  }
}
