import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//import {useHistory} from "react-router-dom";
function Login({showAlert}) {
  
  const [credentials , setCredentials] =  useState({email : "" , password : ""});
//let history = useHistory() 

const nevigate =  useNavigate(); 

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const responce = await fetch('http://localhost:5000/api/auth/login', {
      method : "POST",
      headers :{
        'Content-Type' : 'application/json'
      },
      body :JSON.stringify({email :credentials.email , password : credentials.password})
    });
    const json = await responce.json();
    console.log(json);
    if(json.success){
      // redirect
      localStorage.setItem('token', json.authToken);
     // history.push('/');
     nevigate("/addnotes");
     showAlert("Login SuccessFully", 'success')
    }
    else{
     showAlert("Invalid Credentials", 'danger')
    }
  }
  const handleOnChange =(event)=>{
    setCredentials({...credentials , [event.target.name]: event.target.value});
  }

  return (
    <div className='container'>
            <center><h2 className='login signup mt-3 mb-4'>Login Here </h2>
            <form
                onSubmit={handleSubmit}
            >
          <div className="form-group">
            <label htmlFor="tidemaillte">Your Email</label>
            <input
            onChange={handleOnChange}
              type="email"
              className="form-control my-2"
              id="email"
              name="email"
              value = {credentials.email}
              aria-describedby="tilteHelp"
              placeholder="e.g => abcd12@gmail.com"
            />
          </div>
          <div className="form-group  my-3">
            <label htmlFor="Password my-2">Your Password</label>
            <input
             
              type="password"
              className="form-control my-2"
            
              value={credentials.password}
              onChange={handleOnChange}
                id="password"
              name="password"
              placeholder="Enter Password"
            />
                </div>
              <button 
          
              className=" mt-3 mb-3 btn btn-primary">Login</button>
            </form>
            </center>
    </div>
  )
}

export default Login
