import { newUser } from '../stubs/newUser'
import {
  CONTINUE_USER__CONTINUE,
  CONTINUE_USER__CLOSE,
  CONTINUE_USER__FAILURE,

  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  FORWARD_BACK_PROFILE__FORWARD,
  FORWARD_BACK_PROFILE__BACK,
  FORWARD_BACK_PROFILE__FAILURE,

  FORWARD_BACK_CONTACTS__FORWARD,
  FORWARD_BACK_CONTACTS__BACK,
  FORWARD_BACK_CONTACTS__FAILURE,

  DELETE_ADD_FIELD_PHONE__ADD,
  DELETE_ADD_FIELD_PHONE__DELETE,
  DELETE_ADD_FIELD_PHONE__FAILURE,

  FORWARD_BACK_CAPABILITIES__FORWARD,
  FORWARD_BACK_CAPABILITIES__BACK,
  FORWARD_BACK_CAPABILITIES__FAILURE,
} from '../Actions'



export default function newUserReducer(state = newUser, action) {
  switch(action.type) {

    case CONTINUE_USER__CONTINUE: {
      return {
        ...state,

        error: undefined,
      }
    }
    case CONTINUE_USER__CLOSE: {
      return {
        ...state,
        isQuestion: action.payload.isQuestion,
        error: undefined,
      }
    }
    case CONTINUE_USER__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case SAVE_USER_SRC_AVATAR_IMG__SUCCESS: {
      return {
        ...state,
        userSRCAvatarIMG: action.payload.userSRCAvatarIMG,
        error: undefined,
      }
    }
    case SAVE_USER_SRC_AVATAR_IMG__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case FORWARD_ACCOUNT__SUCCESS: {
      return {
        ...state,
        userName: action.payload.userName,
        password: action.payload.userName,
        repeatPassword: action.payload.repeatPassword,
        error: undefined,
      }
    }
    case FORWARD_ACCOUNT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case FORWARD_BACK_PROFILE__BACK: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        birthDate: action.payload.birthDate,
        email: action.payload.email,
        address: action.payload.address,
        gender: action.payload.gender,
        error: undefined,
      }
    }
    case FORWARD_BACK_PROFILE__FORWARD: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        birthDate: action.payload.birthDate,
        email: action.payload.email,
        address: action.payload.address,
        gender: action.payload.gender,
        error: undefined,
      }
    }
    case FORWARD_BACK_PROFILE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case FORWARD_BACK_CONTACTS__FORWARD: {
      return {
        ...state,
        forwardBack: action.payload.forwardBack,
        company: action.payload.company,
        githubLink: action.payload.githubLink,
        facebookLink: action.payload.facebookLink,
        fax: action.payload.fax,
        phoneN1: action.payload.phoneN1,
        phoneN2: action.payload.phoneN2,
        phoneN3: action.payload.phoneN3,
        error: undefined,
      }
    }
    case FORWARD_BACK_CONTACTS__BACK: {
      return {
        ...state,
        forwardBack: action.payload.forwardBack,
        company: action.payload.company,
        githubLink: action.payload.githubLink,
        facebookLink: action.payload.facebookLink,
        fax: action.payload.fax,
        phoneN1: action.payload.phoneN1,
        phoneN2: action.payload.phoneN2,
        phoneN3: action.payload.phoneN3,
        error: undefined,
      }
    }

    case FORWARD_BACK_CONTACTS__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case DELETE_ADD_FIELD_PHONE__DELETE: {
      return {
        ...state,
        quantityPhoneField: action.payload.quantityPhoneField,
        error: undefined,
      }
    }
    case DELETE_ADD_FIELD_PHONE__ADD: {
      return {
        ...state,
        quantityPhoneField: action.payload.quantityPhoneField,
        error: undefined,
      }
    }

    case DELETE_ADD_FIELD_PHONE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case FORWARD_BACK_CAPABILITIES__FORWARD: {
      return {
        ...state,
        selectSkills: action.payload.selectSkills,
        textareaField:  action.payload.textareaField,
        checkboxArt: action.payload.checkboxArt,
        checkboxSport: action.payload.checkboxSport,
        checkboxJustWant: action.payload.checkboxJustWant,
        checkboxFemale: action.payload.checkboxFemale,
        checkboxGuitar: action.payload.checkboxGuitar,
        checkboxWtf: action.payload.checkboxWtf,
        error: undefined,
      }
    }
    case FORWARD_BACK_CAPABILITIES__BACK: {
      return {
        ...state,
        selectSkills: action.payload.selectSkills,
        textareaField:  action.payload.textareaField,
        checkboxArt: action.payload.checkboxArt,
        checkboxSport: action.payload.checkboxSport,
        checkboxJustWant: action.payload.checkboxJustWant,
        checkboxFemale: action.payload.checkboxFemale,
        checkboxGuitar: action.payload.checkboxGuitar,
        checkboxWtf: action.payload.checkboxWtf,
        error: undefined,
      }
    }

    case FORWARD_BACK_CAPABILITIES__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }



    default:
      return state
  }
}
