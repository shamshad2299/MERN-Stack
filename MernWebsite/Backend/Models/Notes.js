const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesShema = new Schema({
  user : {
 type : mongoose.Schema.Types.ObjectId,
 ref : 'user',
  },
 title :{
  type :String,
  required :true,
 },
 description :{
  type :String,
   required :true,
 },
 tags :{
  type :String,
  default :"Shamshad",
 },
 timeStamp :{
  type :Date,
  // required :true,
  default : Date.now(),
 }
});
const notes = mongoose.model("notes",NotesShema);
notes.createIndexes();
module.exports = notes;