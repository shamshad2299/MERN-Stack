
import { Outlet } from 'react-router-dom'
import './App.css'
import React, { Children, createContext, useState } from 'react'
import NoteState from './NotesContext/Notes/NoteState';



function App() {

  //const [myName , setMyname] = useState("Shamshad");
  return (
    <>
<NoteState>
<Outlet></Outlet>

 
</NoteState>
    </>
  )
}

export default App;
