import React from 'react'
import { useNavigate } from 'react-router-dom'

function Empty() {
  const nevigate = useNavigate();
  const handleClick =()=>{
    nevigate("/addnotes");
  }
  return (
    <div>
      <center><h1 className='my-4'>There is no more Notes</h1>
      <p 
      onClick={handleClick}
      className=" btn btn-primary my-4"> Please Add More Notes</p>
      </center>
    </div>
  )
}

export default Empty
