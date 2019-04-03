

export const SAVE_USER_SRC_AVATAR_IMG = 'SAVE_USER_SRC_AVATAR_IMG'
export const SAVE_USER_SRC_AVATAR_IMG__SUCCESS = 'SAVE_USER_SRC_AVATAR_IMG__SUCCESS'
export const SAVE_USER_SRC_AVATAR_IMG__FAILURE = 'SAVE_USER_SRC_AVATAR_IMG__FAILURE'


export const FORWARD_ACCOUNT = 'FORWARD_ACCOUNT'
export const FORWARD_ACCOUNT__SUCCESS = 'FORWARD_ACCOUNT__SUCCESS'
export const FORWARD_ACCOUNT__FAILURE = 'FORWARD_ACCOUNT__FAILURE'

export const SAVE_BIRTH_DATE = 'SAVE_BIRTH_DATE'
export const SAVE_BIRTH_DATE__SUCCESS = 'SAVE_BIRTH_DATE__SUCCESS'
export const SAVE_BIRTH_DATE__FAILURE = 'SAVE_BIRTH_DATE__FAILURE'

export const SAVE_GENDER_INPUT = 'SAVE_GENDER_INPUT'
export const SAVE_GENDER_INPUT__SUCCESS = 'SAVE_GENDER_INPUT__SUCCESS'
export const SAVE_GENDER_INPUT__FAILURE = 'SAVE_GENDER_INPUT__FAILURE'

export const FORWARD_BACK_PROFILE = 'FORWARD_BACK_PROFILE'
export const FORWARD_BACK_PROFILE__FORWARD = 'FORWARD_BACK_PROFILE__FORWARD'
export const FORWARD_BACK_PROFILE__BACK = 'FORWARD_BACK_PROFILE__BACK'
export const FORWARD_BACK_PROFILE__FAILURE = 'FORWARD_BACK_PROFILE__FAILURE'




export const saveUserSRCAvatarIMG = userSRCAvatarIMG => (
  {
    type: SAVE_USER_SRC_AVATAR_IMG,
    payload: {
      userSRCAvatarIMG,
    },
})


export const forwardAccount = (userName, password, repeatPassword) => (
  {
    type: FORWARD_ACCOUNT,
    payload: {
      userName, password, repeatPassword,
    },
  })

export const saveBirthDate = birthDate => (
  {
    type: SAVE_BIRTH_DATE,
    payload: {
      birthDate
    },
  })

export const saveGenderInput = gender => (
  {
    type: SAVE_GENDER_INPUT,
    payload: {
      gender
    },
  })

export const forwardBackProfile = (forwardBack, firstName, lastName, email, address) => (
  {
    type: FORWARD_BACK_PROFILE,
    payload: {
      forwardBack, firstName, lastName, email, address
    },
  })

