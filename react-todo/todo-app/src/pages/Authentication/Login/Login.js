import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext";

const initialState = { email: "", passwoard: "" }
export default function Login() {

    const { dispatch } = useContext(AuthContext)

    const navigate = useNavigate()
    const [state, setState] = useState(initialState);
    const [isprocessing, setProcessing] = useState(false);


    const handlechange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handlelogin = e => {
        e.preventDefault()
        let { email, passwoard } = state;

        // console.log(passwoard);
        // console.log(email)

        setProcessing(true);
        signInWithEmailAndPassword(auth, email, passwoard)
            .then((userCredential) => {
                let user = userCredential.user;
                console.log(user)

                dispatch({ type: "LOGIN", payload: { user } })

                navigate("/dashboard")
            })
            .catch(err => {
                console.err(err)
            })
            .finally(() => {
                setProcessing(false)
            })

    }
    return (
        <div className="auth">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h2 className="mb-4">Login</h2>
                                </div>
                            </div>
                            <form onSubmit={handlelogin}>
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
                                <div className="row mb-3">
                                    <div className="col">
                                        <button className="btn w-100">
                                            {!isprocessing
                                                ? "Login"
                                                : <div className="spinner-grow spinner-grow-sm"></div>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 text-center"> Need an account? <Link to='/auth/register' className="text-dark">Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
