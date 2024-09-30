import React from 'react'

function Alert({alert}) {
  return (
    <div style={{height: "60px"}}>
      
    {  alert && <div className={`alert alert-${alert.type}`} role="alert">
      <strong>{alert.type}</strong> : {alert.msg} 
   </div>}
       </div>
  )
}

export default Alert;
