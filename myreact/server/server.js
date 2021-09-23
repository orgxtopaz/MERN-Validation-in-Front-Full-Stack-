const express = require("express");
const cors = require("cors");
const app = express(); //back end web application framework
const mongoose = require("mongoose");



app.use(express.json()); //Translate into Json those data in Object
const UserRouter = require("./routes/user.routes"); //CALL THE ROUTES FOLDER

require("dotenv").config();

const migzapp = express(); // framwework to be used
const port = process.env.PORT || 5000; // the port .env give port if 5000 already used

migzapp.use(cors()); // migzapp will use cors
migzapp.use(express.json()); // migzapp use express.json

const uri = process.env.ATLAS_URI; // getting the datas in the .env which is the mongo database

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
); // MONGO DB NEEDED CONFIG.

const connection = mongoose.connection; // CONNECT NOW TO DATABASE / MONGO DB

connection.once("open", () => {
  console.log("MONGO DB CONNECTION ESTABLISHED! HINAMPAK");
});

migzapp.use("/user", UserRouter); //

migzapp.listen(port, () => {
  console.log("Server is running in port:" + port);
});
