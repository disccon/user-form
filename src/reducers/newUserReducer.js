import newUser from '../stubs/newUser'
import {
  SAVE_USER_SRC_AVATAR_IMG__SUCCESS,
  SAVE_USER_SRC_AVATAR_IMG__FAILURE,

  FORWARD_ACCOUNT__SUCCESS,
  FORWARD_ACCOUNT__FAILURE,

  SAVE_BIRTH_DATE__SUCCESS,
  SAVE_BIRTH_DATE__FAILURE,

  SAVE_GENDER_INPUT__SUCCESS,
  SAVE_GENDER_INPUT__FAILURE,

  FORWARD_BACK_PROFILE__FORWARD,
  FORWARD_BACK_PROFILE__BACK,
  FORWARD_BACK_PROFILE__FAILURE,

  FORWARD_BACK_CONTACTS__FORWARD,
  FORWARD_BACK_CONTACTS__BACK,
  FORWARD_BACK_CONTACTS__FAILURE,

  DELETE_ADD_FIELD_PHONE__ADD,
  DELETE_ADD_FIELD_PHONE__DELETE,
  DELETE_ADD_FIELD_PHONE__FAILURE,

  SAVE_SELECT_LANGUAGE__SUCCESS,
  SAVE_SELECT_LANGUAGE__FAILURE,

  SAVE_SELECT_SKILLS__SUCCESS,
  SAVE_SELECT_SKILLS__FAILURE,

  SAVE_TEXTAREA_FIELD__SUCCESS,
  SAVE_TEXTAREA_FIELD__FAILURE,

  SAVE_CHECKBOX_ART__SUCCESS,
  SAVE_CHECKBOX_ART__FAILURE,

  SAVE_CHECKBOX_SPORT__SUCCESS,
  SAVE_CHECKBOX_SPORT__FAILURE,

  SAVE_CHECKBOX_JUSTWANT__SUCCESS,
  SAVE_CHECKBOX_JUSTWANT__FAILURE,

  SAVE_CHECKBOX_FEMALE__SUCCESS,
  SAVE_CHECKBOX_FEMALE__FAILURE,

  SAVE_CHECKBOX_GUITAR__SUCCESS,
  SAVE_CHECKBOX_GUITAR__FAILURE,

  SAVE_CHECKBOX_WTF__SUCCESS,
  SAVE_CHECKBOX_WTF__FAILURE,
} from '../Actions'

export default function newUserReducer(state = newUser, action) {
  switch(action.type) {
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

    case SAVE_BIRTH_DATE__SUCCESS: {
      return {
        ...state,
        birthDate: action.payload.birthDate,
        error: undefined,
      }
    }
    case SAVE_BIRTH_DATE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }


    case SAVE_GENDER_INPUT__SUCCESS: {
      return {
        ...state,
        gender: action.payload.gender,
        error: undefined,
      }
    }
    case SAVE_GENDER_INPUT__FAILURE: {
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
        email: action.payload.email,
        address: action.payload.address,
        error: undefined,
      }
    }
    case FORWARD_BACK_PROFILE__FORWARD: {
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        address: action.payload.address,
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

    case SAVE_SELECT_LANGUAGE__SUCCESS: {
      return {
        ...state,
        selectLanguage: action.payload.selectLanguage,
        error: undefined,
      }
    }

    case SAVE_SELECT_LANGUAGE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_SELECT_SKILLS__SUCCESS: {
      return {
        ...state,
        selectSkills: action.payload.selectSkills,
        error: undefined,
      }
    }

    case SAVE_SELECT_SKILLS__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_TEXTAREA_FIELD__SUCCESS: {
      return {
        ...state,
        textareaField: action.payload.textareaField,
        error: undefined,
      }
    }

    case SAVE_TEXTAREA_FIELD__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }





    case SAVE_CHECKBOX_ART__SUCCESS: {
      return {
        ...state,
        checkboxArt: action.payload.checkboxArt,
        error: undefined,
      }
    }
    case SAVE_CHECKBOX_ART__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CHECKBOX_SPORT__SUCCESS: {
      return {
        ...state,
        checkboxSport: action.payload.checkboxSport,
        error: undefined,
      }
    }

    case SAVE_CHECKBOX_SPORT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CHECKBOX_JUSTWANT__SUCCESS: {
      return {
        ...state,
        checkboxJustWant: action.payload.checkboxJustWant,
        error: undefined,
      }
    }
    case SAVE_CHECKBOX_JUSTWANT__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CHECKBOX_FEMALE__SUCCESS: {
      return {
        ...state,
        checkboxFemale: action.payload.checkboxFemale,
        error: undefined,
      }
    }
    case SAVE_CHECKBOX_FEMALE__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CHECKBOX_GUITAR__SUCCESS: {
      return {
        ...state,
        checkboxGuitar: action.payload.checkboxGuitar,
        error: undefined,
      }
    }
    case SAVE_CHECKBOX_GUITAR__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }

    case SAVE_CHECKBOX_WTF__SUCCESS: {
      return {
        ...state,
        checkboxWtf: action.payload.checkboxWtf,
        error: undefined,
      }
    }

    case SAVE_CHECKBOX_WTF__FAILURE: {
      return {
        ...state,
        error: action.error,
      }
    }










    default:
      return state
  }
}
