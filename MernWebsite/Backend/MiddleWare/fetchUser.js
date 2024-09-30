var jwt = require('jsonwebtoken');
const JWT_SECRET = "shamshad123@$12";

const fetchUser =( req , res, next)=>{
let success = false;
  // get the user from the jwt token  and id to the req object

  const token  = req.header('auth-token');
  if(!token){
    success  = false;
    res.status(401).send({success,error : "Please Authenticate using a valid token"});
  }
  try {
    
    const tokenData = jwt.verify(token , JWT_SECRET)
    req.user = tokenData.user;
    next();

  } 
  catch (error) {
    res.status(401).send({error : "Please Authenticate using a valid token"});
    
  }
 
}

module.exports = fetchUser;