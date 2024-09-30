const express = require("express");
const Notes = require("../Models/Notes");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const fetchUser = require("../MiddleWare/fetchUser");

// ROUTE-1 => get all the Notes :GET"/api/notes/fetchallNotes" login required

router.get("/fetchallNotes", fetchUser, async (req, res) => {
  try {
    const myNotes = await Notes.find({ user: req.user.id });

    res.json(myNotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

// ROUTE-2 => add a new Note using: POST "/api/notes/addnote" login required

router.post(
  "/addnote",
  fetchUser,
  [
    // body('tilte', 'Enter a valid title').isLength({ min: 3 }),
    body(
      'description',
      'Enter a valid description it must be contain 5 characters'  
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    try {
      const { title, description, tags } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
      }
      const note =  new Notes({
        title,
        description,
        tags,
        user: req.user.id,
      });

      const savedNotes = await note.save();

      res.json(success,savedNotes);
      success = true;
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

// ROUTE-3 => update an existing Note using: POST "/api/notes/update" login required

router.put(
  "/update/:id",
  fetchUser,
  async (req, res) => {
    try {
      const {title ,description ,tags} = req.body;
const newNote = {};
if(title){newNote.title = title};
if(description){newNote.description = description};
if(tags){newNote.tags = tags};

// Find the note to be updated and update it

let note  = await Notes.findById(req.params.id);
if(!note){
 return  res.status(404).send("note not Found");
}

//Allow update only if user owns this note

if(note.user.toString() !== req.user.id){
 return res.status(401).send("unAthorised Access be deniend");
}
note  = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote} , {new :true});
res.json({note});

    } catch (error) {
      
      console.error(error.message);
      res.status(500).send({ error: "Internal server error" });

    }
  })
// ROUTE-4 => Delete an existing Note using: DELETE "/api/notes/delete" login required

router.delete(
  "/delete/:id",
  fetchUser,
  async (req, res) => {
    try {

// Find the note to be delete and delete  it

let note  = await Notes.findById(req.params.id);
if(!note){
 return  res.status(404).send("note not Found");
}

//Allow deletion only if user owns this note

if(note.user.toString() !== req.user.id){
 return res.status(401).send("Not Allowed");
}
note  = await Notes.findByIdAndDelete(req.params.id);
res.json({"success" : "note has been deleted" , note : note});

    } catch (error) {
      
      console.error(error.message);
      res.status(500).send({ error: "Internal server error" });

    }
  })

module.exports = router;
