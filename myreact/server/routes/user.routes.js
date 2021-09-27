//Routing defines the way in which the client requests are handled by the application endpoints.

const router = require("express").Router();
let User = require("../models/user.model");

// DISPLAY
router.route("/").get((req, res) => {
  User.find() // PROMISE IF ELSE
    .then((user) => res.json(user)) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error : " + err)); // IF ERROR
});

// ADD DATA
router.route("/add").post((req, res) => {
  const fullname = req.body.fullname;
  const location = req.body.location;
  const email = req.body.email;
  const contactNumber = req.body.contactNumber;
  const date = req.body.date;
 

  const newUser = new User({ fullname, location, email, contactNumber, date }); // Instantiate the User in user.model

  newUser
    .save() //PROMISE
    .then((user) => res.json("New record added!")) // IF TRUE CHECK
    .catch((err) => res.status(400).json("Error: " + err)); // CATCH THE ERROR
});

// //details

router.route("/view/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//DELETE
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("Record was deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//UPDATE
router.route("/update/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
  
      user.location = req.body.location;
      user.email = req.body.email;
      user.contactNumber = req.body.contactNumber;
      
      user.save()
        
        .then((user) => res.json("Record was updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
