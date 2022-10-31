import { onAuthStateChanged } from "firebase/auth";
import React, { useReducer, createContext, useEffect } from "react";
import { auth } from "../config/firebase";


export const AuthContext = createContext()

const initialState = { isAuthenticated:false,user:{uid:""}}

const readucer = ((state, action) => {
  // console.log(state)
  // console.log(action)
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload.user }
    case "LOGOUT":
      return { isAuthenticated: false }
    default:
      return state;
  }
})
export default function AuthContextProvider(props) {

  const [state, dispatch] = useReducer(readucer, initialState)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // console.log(user)
        // console.log("User is signed in")
        dispatch({ type: "LOGIN", payload: { user } })
        // ...
      } else {
        console.log("User is signed out")
      }
    });
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
