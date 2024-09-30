const express = require("express");
const router = express.Router();

const { body, query, validationResult } = require("express-validator");
const User = require("../Models/user");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser = require("../MiddleWare/fetchUser");


//const a  = localStorage.getItem('JWT_SECRET');

const JWT_SECRET = "shamshad123@$12";

//ROUTE -1 => Create a user using  :POST "/api/auth/createuser" doesn't require Auth

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Email already exists. Please choose another email." });
      }

      // destructuring name ,email and password from req.body

    const {name , email , password} = req.body;
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password ,salt);

      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const data = {
        user : {
          id : newUser.id
        }
      }
    const authToken = jwt.sign(data,JWT_SECRET);

    success = true;
      res.json({success, authToken });
    } catch (error) {
      success = false;
      console.log(error.message);
      res.status(500).json({success, error: "Failed to create user. Please try again." });
    }
  }
);

// ROUTE -2 => authenticate a user using :POST "/api/auth/login".no login required

router.post(
  "/login",
  [
    //body("name", "Enter a valid name").isLength({ min: 4 }),

    body("email", "Enter a valid email").isEmail(),

   body("password", "password should not be blank").exists(),
  ],
  async (req, res) => 
    {
      let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email , password}  =req.body;
    try {
      let user = await User.findOne({email });
      if(!user){
        return res.status(400).json({error : "Please Enter Correct Details"});

      }
      const passwordCompare = await bcrypt.compare(password , user.password);
      if(!passwordCompare){
        success = false;
        return  res.status(400).json({success,error : "Please Enter Correct password"});
      }
      
      // payload value of our newly created user

        const data = {
          user : {
            id :user.id
          }
        }
 
     const authToken = jwt.sign(data,JWT_SECRET);
     success = true;
     res.json({success,authToken});
    } catch (error) {

      console.log(error.message);
      res.status(500).json({ error: "Failed to create user due to internal server error . Please try again." });
      
    }
  
  }
);
// ROUTE - 3 => Get logged in User Details using : POST "api/auth/getuser". Login required

router.post(
  "/getuser",
  fetchUser,
   async (req, res) => {

try {
const userId = req.user.id;
  const newuser = await User.findById(userId).select("-password");
  res.send(newuser);
} catch (error) {
  
  console.log(error.message);
  res.status(500).json({ error: "Failed to create user due to internal server error . Please try again." });

}
}
)

module.exports = router;