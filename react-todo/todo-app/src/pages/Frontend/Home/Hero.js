import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { setDoc, serverTimestamp, doc } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";

const initialstate = {
  title: "",
  location: '',
  descripition: ''
}

export default function Hero() {

  const { user } = useContext(AuthContext)
  const [state, setState] = useState(initialstate)
  const [isprocessing, setisprocessing] = useState(false)

  const handlechange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handlesubmit = e => {
    e.preventDefault();

    let { title, location, descripition } = state

    title = title.trim()
    location = location.trim()
    descripition = descripition.trim()

    if (title.length < 3) {
      return window.notify("Title length should be at least 3 charater!", 'error');
    }

    if (location.length < 3) {
      return window.notify("please enter your location!", 'error');
    }

    if (descripition.length < 10) {
      return window.notify("please enter your descripition!", 'error');
    }
    // console.log(user.email);
    // return

    let formData = { title, location, descripition }
    formData.dateCreated = serverTimestamp()
    formData.id = window.getRandomId()
    formData.status = "active"
    formData.createdBy = {
      email: user.email,
      uid: user.uid
    }

    createDocument(formData)
  }

  const createDocument = async (formData) => {
    setisprocessing(true)
    // console.log(formData);
    try {
      await setDoc(doc(firestore, "Todo", formData.id), formData);
      window.notify("Todo has been successfully added", "success")
    } catch (err) {
      console.error(err)
      window.notify("something went wrong, Todo is not add", "error")
    }
    setisprocessing(false)

  }

  return <>
    <div className="py-5 home">
      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card p-3 p-mb-4 p-lg-4">
              <div className="row">
                <div className="col">
                  <h2 className="text-center mb-4">Add Todos</h2>
                </div>
              </div>
              <form onSubmit={handlesubmit}>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className="form-control" name="title" placeholder="Enter Title" onChange={handlechange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className="form-control" name="location" placeholder="Enter Location" onChange={handlechange} />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <textarea name="descripition" className="form-control" rows="5" placeholder="Enter Descripition" onChange={handlechange}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className="btn btn-danger w-100" disabled={isprocessing}>
                      {
                        !isprocessing ?
                          "Add Todo" :
                          <div className="spinner-border spinner-border-sm"></div>
                      }
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}
