import React, { useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from '../App';
import Home from "../component/Home"
import NavBar from '../component/NavBar';
import About from '../component/About';
import AddNotes from '../component/AddNotes';
import SignUp from '../component/SignUp';
import Login from '../component/Login';

function NotebookRouter() { 
  const [credentials , setCredentials] =  useState({name : "" ,email : "" , password : "" , cpassword : ""});
  const [alert , setAlert] = useState(null);
  const showAlert =(message , type)=>{
    setAlert({
      msg : message,
      type :type,
    });
    setTimeout (()=>{
     setAlert(null);
    },2500)
  }
  let router  = createBrowserRouter([
{path : "/", element : <App/>  , children : [
   {path : "/", element :  <NavBar showAlert={showAlert} alert={alert}></NavBar> ,children : [

    {  path : "/home" , element : <Home alert = {alert} showAlert ={showAlert} credentials ={credentials}  />},
    {  path : "/about" , element : <About/>},
    {  path : "/addnotes" , element : <AddNotes showAlert = {showAlert}/>},
    {  path : "/signup" , element : <SignUp showAlert = {showAlert} credentials = {credentials} setCredentials = {setCredentials}/>},
    {  path : "/login" , element : <Login showAlert = {showAlert} />},
   ]},

]}
  ])
  return (
  <>
    <RouterProvider router={router}/>
  </>
  )
}

export default NotebookRouter;
