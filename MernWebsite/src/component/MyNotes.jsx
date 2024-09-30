import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../NotesContext/Notes/noteContext";
import NotesItem from "./NotesItem";

import Empty from "./Empty";
import { useNavigate } from "react-router-dom";

export default function MyNotes({showAlert }) {

  const nevigate = useNavigate();
  const myNotes = useContext(NoteContext);
  const { notes, getAllNotes ,updateNote} = myNotes;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id : "",
    etitle: "",
    edescription: "",
    etags: "default",
  });

  useEffect(() => {
    if(localStorage.getItem('token')){ 
      getAllNotes();
   }
   else {
    showAlert('please Login First for opening your Notes', 'danger');
     nevigate("/login");
   }
  }, []);

  const updateMyNote = (currentNotes) => {
   // console.log(currentNotes._id);
    ref.current.click();
    setNote({id : currentNotes._id,etitle:currentNotes.title,edescription : currentNotes.description , etags :currentNotes.tags});
  };
  const handleOnClick = () => {
    updateNote(note.id,note.etitle , note.edescription ,  note.etags );
    refClose.current.click();
    showAlert("note is Updated" ,"warning")
 
//console.log("updating a note...",note)
  //setNote(note);
    // nevigate("/home");
  };
  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className=" active modal-title mx-3" id="exampleModalLabel">
                Edit your Notes
              </h5>
              <button
                type="button"
                className="close mx-4 lock"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="lock" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div className="container ">
                  <h1>Add your Notes </h1>
                  <form>
                    <div className="form-group">
                      <label htmlFor="etilte">Title</label>
                      <input
                        onChange={handleOnChange}
                        value={note.etitle}
                        type="text"
                        className="form-control my-2"
                        id="etitle"
                        name="etitle"
                        aria-describedby="tilteHelp"
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="edescription my-2">Description</label>
                      <input
                        onChange={handleOnChange}
                        value={note.edescription}
                        type="text"
                        className="form-control my-2"
                        id="edescription"
                        name="edescription"
                        placeholder="Enter description"
                      />
                    </div>
                    <div className="form-group  my-3">
                      <label htmlFor="tags my-2">Tags</label>
                      <input
                        onChange={handleOnChange}
                        value={note.etags}
                        type="text"
                        className="form-control my-2"
                        id="etags"
                        name="etags"
                        placeholder="Enter Tags"
                      />
                    </div>
                    <div className="form-check"></div>
                    <center></center>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            
              <button
              onClick={handleOnClick}
              disabled ={note.etitle.length<5 || note.edescription.length<5}
              type="button" className="btn btn-primary">
                update Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
     {notes.length === 0 && <Empty/>}
        {notes.map((i) => (
          <NotesItem key={i._id} notes={i} updateMyNote={updateMyNote} showAlert={showAlert}  />
        ))}
      </div>
    </>
  );
}
