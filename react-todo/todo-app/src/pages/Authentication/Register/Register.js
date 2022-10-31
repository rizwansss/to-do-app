   
import React,{useState,useContext} from "react";
import {Link} from 'react-router-dom'
import { auth,firestore } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { AuthContext } from "../../../context/AuthContext";

 const initialState = {email:"", passwoard:""}
export default function  Register() {

const {dispatch} = useContext (AuthContext)

    const [state,setState]= useState(initialState);
    const [isprocessing,setProcessing]= useState(false);


     const handlechange = e=>{
        setState(s=>({...s,[e.target.name]: e.target.value}))
     }

     const handleRegister=e=>{
        e.preventDefault()
        let {email, passwoard} = state;

        setProcessing(true);
         createUserWithEmailAndPassword(auth, email,passwoard)
         .then((userCredential)=>{
            let user = userCredential.user
            addDocument(user)
            console.log(user)
         })
         .catch(err =>{
            console.err(err)
            setProcessing(false)
         })
          
     }

     const addDocument = async(user)=>{
        try{
            await setDoc(doc(firestore, "user", user.uid), {
                firstname: " ",
                 lastname :"",
                 uid:user.uid,
               });
               console.log('user document add firestore')
               dispatch({type:"LOGIN",payload:{user}})
        }
       catch(err){
        console.err(err)
       }
       setProcessing(false)
     }
    return (
        <div className="auth">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                     <div className="card p-2 p-md-3 p-lg-4">
                        <div className="row">
                            <div className="col">
                                <h2 className="mb-4">Register</h2>
                            </div>
                        </div>
                        <form onSubmit={handleRegister}>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" placeholder="Email" name="email" onChange={handlechange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="passwoard">Passwoard</label>
                                <input type="passwoard" className="form-control" placeholder="Passwoard" name="passwoard" onChange={handlechange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn w-100"> 
                                {!isprocessing
                                ?"Register"
                            : <div className="spinner-grow spinner-grow-sm"></div>
                            }
                                </button>
                            </div>
                        </div>
                        </form>
                        <div className="row mt-3">
                            <div className="col">
                                <p className="mb-0 text-center">All ready an account? <Link to ='/auth/login' className="text-dark">Login</Link></p>
                            </div>
                        </div>
                     </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

