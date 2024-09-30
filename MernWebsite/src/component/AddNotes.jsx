import React, { useContext, useState } from 'react'
import NoteContext from '../NotesContext/Notes/noteContext';
import { useNavigate } from 'react-router-dom';

function AddNotes({showAlert}) {
  const [note , setNote] = useState({title :"" ,description : "" , tags : "default"});

 const nevigate =  useNavigate();
  const myContext =  useContext(NoteContext);
  const {addNote , loading} = myContext;

 const handleOnClick = (event) => {
   
event.preventDefault();
addNote(note);
showAlert("Note is Added" , "success")
nevigate("/home");
 };
 const handleOnChange = (event) => {
   
    setNote({...note,[event.target.name]:event.target.value});

 };
  return (
    <div>
      
      <div className="container ">
     <center>   <h1 className='mt-3' style={{color : "green",backgroundColor : "yellow",width :"max-content",padding :"4px",borderRadius :"10px"}}>Add your Notes </h1></center>
        <form
        onSubmit={handleOnClick}
        >
          <div className="form-group">
            <label htmlFor="tilte">Title</label>
            <input
            onChange={handleOnChange}
              type="text"
              className="form-control my-2"
              id="title"
              name="title"
              aria-describedby="tilteHelp"
              placeholder="Enter title"
              required
              minLength={5}
            />
          </div>
          <div className="form-group  my-3">
            <label htmlFor="description my-2">Description</label>
            <input
              onChange={handleOnChange}
              type="text"
              className="form-control my-2"
              id="description"
              name="description"
              required
              minLength={5}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group  my-3">
            <label htmlFor="tags my-2">Tags</label>
            <input
              onChange={handleOnChange}
              type="text"
              className="form-control my-2"
              id="tags"
              name="tags"
              placeholder="Enter Tags"
            />
          </div>
          <div className="form-check">
      
          </div>
        <center>
        <button
           disabled ={note.title.length<5 || note.description.length<5}
            type="submit"
            className="btn btn-primary mb-4"
          >
          Add Notes
          </button>
        </center>
        </form>
    </div>
    </div>
  )
}

export default AddNotes
