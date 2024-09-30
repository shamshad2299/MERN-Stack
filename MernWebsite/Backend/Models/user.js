const mongoose = require("mongoose");
const { Schema } = mongoose;

const userShema = new Schema({
 name :{
  type :String,
  required :true,
 },
 email :{
  type :String,
  required :true,
 },
 password :{
  type :String,
  required :true,
 },
 timeStamp :{
  type :Date,
  // required :true,
  default : Date.now(),
 }
});

const user = mongoose.model("user",userShema);
//user.createIndexes();
module.exports  = user;