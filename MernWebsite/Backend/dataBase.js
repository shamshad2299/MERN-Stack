const mongoose = require("mongoose");
const mongooseUri = "mongodb://localhost:27017";
const connectToMongo=()=>{

mongoose.connect(mongooseUri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
}
  module.exports = connectToMongo;