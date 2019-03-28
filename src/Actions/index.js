export const CHANGE_NAME_TEXT_FIELD = 'CHANGE_NAME_TEXT_FIELD'
export const CHANGE_NAME_TEXT_FIELD__SUCCESS = 'CHANGE_NAME_TEXT_FIELD__SUCCESS'
export const CHANGE_NAME_TEXT_FIELD__FAILURE = 'CHANGE_NAME_TEXT_FIELD__FAILURE'


export const changeTextFieldAddingNewUser = ({target}) => (
  console.log('1111',target.value),
  {
  type: CHANGE_NAME_TEXT_FIELD,
  payload: {
    textFieldName: target.value,
  },
})



