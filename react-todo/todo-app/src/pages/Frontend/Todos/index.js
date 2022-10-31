import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, where, query } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";
import { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

export default function Todos() {


  const { user } = useContext(AuthContext)
  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)
  const [isLoading, setIsloading] = useState(true)

  const handlechange = e => {
    setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
  }


  const fatchDocument = async () => {

    let array = []
    const q = query(collection(firestore, "Todo"), where("createdBy.uid", "==", user.uid));


    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      // doc.data() is never undefined for query doc snapshots
      array.push(data);
      console.log(array);
    });

    setDocuments(array)
    setIsloading(false)
  }

  useEffect(() => {
    fatchDocument()
  }, [user])

  const handleUpdate = async () => {
    let FormData = { ...todo }
    FormData.dateCreated = FormData.dateCreated
    FormData.dateModified = serverTimestamp()

    FormData.modifiedBy = {
      email: user.email,
      uid: user.uid
    }
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Todo", FormData.id), FormData, { merge: true });
      window.notify("Todo has been successfully updated", "success");

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id)
          return todo
        return doc
      })

      setDocuments(newDocuments)

    } catch (err) {
      console.error(err)
      window.notify("something went wrong, Todo is not updated", "error")
    }
    setIsProcessing(false)

  }

  const handleDelete = async (todo) => {
    console.log(todo)

    setIsProcessingDelete(true)
    try {
      await deleteDoc(doc(firestore, "Todo", todo.id));
      window.notify("Todo hase been successfully deleted", "error")

      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id
      })

      setDocuments(newDocuments)
    } catch (err) {
      console.error(err)
      window.notify("something went wrong", "error")
    }
    setIsProcessingDelete(false)
  }
  return( <>
    <div className="py-5 home">
      <div className="container">
        <div className="row">
          <div className="col-12 ">
              <div className="row">
                <div className="col">
                  <h2 className="text-center mb-4">Add Todos</h2>
                </div>
              </div>
            <div className="card p-3 p-mb-4 p-lg-4">
              {!isLoading ?
                <Table className="text-center">
                  <Thead>
                    <Tr>
                      <Th>S. No</Th>
                      <Th>Title</Th>
                      <Th>Location</Th>
                      <Th>Descripition</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>

                    </Tr>
                  </Thead>
                  <Tbody>
                    {documents.map((todo, i) => {
                      return <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{todo.title} </Td>
                        <Td>{todo.location}</Td>
                        <Td>{todo.descripition}</Td>
                        <Td>{todo.status}</Td>
                        <Td>
                          <button className="btn btn-info btn-sm me-1" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo); }}>
                            {!isProcessing
                              ? "Edit"
                              : <div className="spinner-border spinner-border-sm"></div>
                            } </button>
                          <button className="btn btn-danger btn-sm" disabled={isProcessingDelete} onClick={() => { handleDelete(todo); }}>
                            {!isProcessingDelete
                              ? "Delete"
                              : <div className="spinner-border spinner-border-sm"></div>
                            }
                          </button>
                        </Td>


                      </Tr>
                    })}

                  </Tbody>
                </Table>
                :
                <div className="text-center"><div className="spinner-grow"></div></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="modal fade" id="editModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update Todo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input type="text" className="form-control" name="title" placeholder="Enter Title" value={todo.title} onChange={handlechange} />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input type="text" className="form-control" name="location" placeholder="Enter Location" value={todo.location} onChange={handlechange} />
              </div>
            </div>
            <div className="row ">
              <div className="col mb-3">
                <textarea name="descripition" className="form-control" rows="5" placeholder="Enter Descripition" value={todo.descripition} onChange={handlechange}></textarea>
              </div>
            </div>
            <div className="row ">
              <div className="col">
                <select name="status" value={todo.status} className="form-control" onChange={handlechange}>
                  <option value="active">Active</option>
                  <option value="inactive">inActive</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
