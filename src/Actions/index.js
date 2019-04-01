export const FORWARD_ACCOUNT = 'FORWARD_ACCOUNT'
export const FORWARD_ACCOUNT__SUCCESS = 'FORWARD_ACCOUNT__SUCCESS'
export const FORWARD_ACCOUNT__FAILURE = 'FORWARD_ACCOUNT__FAILURE'

export const SAVE_BIRTH_DATE = 'SAVE_BIRTH_DATE'
export const SAVE_BIRTH_DATE__SUCCESS = 'SAVE_BIRTH_DATE__SUCCESS'
export const SAVE_BIRTH_DATE__FAILURE = 'SAVE_BIRTH_DATE__FAILURE'

export const SAVE_GENDER_INPUT = 'SAVE_GENDER_INPUT'
export const SAVE_GENDER_INPUT__SUCCESS = 'SAVE_GENDER_INPUT__SUCCESS'
export const SAVE_GENDER_INPUT__FAILURE = 'SAVE_GENDER_INPUT__FAILURE'






export const forwardAccount = (userName, password, repeatPassword, userAvatarIMGUrl) => (
  {
    type: FORWARD_ACCOUNT,
    payload: {
      userName, password, repeatPassword, userAvatarIMGUrl,
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
