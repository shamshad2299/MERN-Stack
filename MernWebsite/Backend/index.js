const connectToMongo = require("./dataBase");
var cors = require('cors')
const express = require("express");
connectToMongo();
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json()); /*        used for sending data for 
                                 catch correct json objects 
                                  it is known as middleWare 
*/

app.use("/api/auth", require("./Routes/auth.js"));
app.use("/api/notes", require("./Routes/note.js"));
//app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.get("/login", (req, res) => {
//   res.send("wow I can sign in ");
// });

// app.get("/signup", (req, res) => {
//   res.send("wow I can sign up  ");
// });

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});
