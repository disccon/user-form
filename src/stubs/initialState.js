import React from "react";

const localState = localStorage.getItem('state')
let initialState =  {
  namePage: 'Adding new user',
  accountPassword: '12356',
  repeatPassword: '12323414',
  userName: ''
}


export default initialState
