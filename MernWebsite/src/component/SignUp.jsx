import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp({ showAlert, credentials , setCredentials }) {

  
 console.log(credentials);
//let history = useHistory() 

const nevigate =  useNavigate(); 

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const responce = await fetch('http://localhost:5000/api/auth/createuser', {
      method : "POST",
      headers :{
        'Content-Type' : 'application/json'
      },
      body :JSON.stringify({name : credentials.name, email :credentials.email , password : credentials.password})
    });
    const json = await responce.json();
   console.log(json);
    if(json.success){
      // redirect
      localStorage.setItem('token', json.authToken);
     // history.push('/');
     nevigate("/login");
    
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
    <div>
      <center>
        <h2 className=" signup mb-3">Enter your Detail for Sign up </h2>
      </center>
      <div className="container">
        <center>
          <form
          onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">your Name</label>
              <input
                onChange={handleOnChange}
                type="text"
                className="form-control my-2"
                id="name"
                name="name"
                 value = {credentials.text}
                aria-describedby="namehelp"
                placeholder="Please Enter your Name"
              />
            </div>
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
                placeholder="Enter a strong Password eg. abcd123@"
              />
            </div>
            <div className="form-group  my-3">
              <label htmlFor="cPassword my-2">confirm Password</label>
              <input
                type="cpassword"
                className="form-control my-2"
                value={credentials.cpassword}
                onChange={handleOnChange}
                id="cpassword"
                name="cpassword"
                placeholder="confirm password"
              />
            </div>
            <button className=" mt-3 mb-3 btn btn-primary">Sign Up</button>
          </form>
        </center>
      </div>
    </div>
  );
}

export default SignUp;
