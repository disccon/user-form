import React from "react";

const localState = localStorage.getItem('state')
let initialState =  {
  namePage: 'Adding new user',
  newUser: {
    userName: '',
    password: '12356',
    repeatPassword: '12323414',

  },
}


export default initialState
