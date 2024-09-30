import React, { useContext } from 'react'
import NoteContext from '../NotesContext/Notes/noteContext';
import Empty from './Empty';

function NotesItem({notes,updateMyNote,showAlert}) {
  console.log(credentials.name);
  const myContext = useContext(NoteContext);
  const {deleteNote} = myContext;

  const handleOnDelete =()=>{
  //console.log(notes._id);
   deleteNote(notes._id);
   showAlert("Item deleted Successfully", 'success')
  }


  return (
  

      
        <div className="card  my-3 " >
           <div className="card-body  ">
             <h3 className="card-title">{notes.title} </h3>
            
              <p className="card-text">{notes.description}</p>
              <a 
              onClick={()=>updateMyNote(notes)}
              href="#" className='btn btn-primary'>Edit Note</a>
              <a
              onClick={handleOnDelete}
               href="#" className='btn btn-primary mx-2'>Delete Note</a>
           </div>
        </div>

  
  )
}

export default NotesItem;
