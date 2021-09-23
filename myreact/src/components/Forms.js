import "bootstrap/dist/css/bootstrap.min.css";
//PARAMS SO WE CAN PASS THE SPECIFIC ID.


import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes

import "./component.css";
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

// IMPORT MATERIAL UI METHODS / COMPONENTS DESIGN
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
////--------------

///IMPORT DATEPICKER FOR OUR DATE

import "react-datepicker/dist/react-datepicker.css";

///------------------

//VALIDATION REQUIREMENTS.
const schema = yup.object().shape({
  fullname: yup
    .string()

    .required(" Full Name field cannot be blank")
    .max(30, " Full Name field accept up to 30 in size only")
    .matches(/^[aA-zZ\s]+$/, " Full Name field accept characters values only "),

  email: yup
    .string()
    .required("Email Address field cannot be blank")
    .email("Email Address field should have email domain ")
    .matches(
      /^([A-Za-z\d.-]+)@([A-Za-z\d]+)\.([A-Za-z]{2,45})$/,
      "Contains Special Character!"
    )
    .max(45, "Email Address field accept up to 45 in size only"),

  contactNumber: yup
    .string()
    .required("Contact Number field cannot be blank")
    .max(11, "Contact Number field accept up to 11 in size only")
    .matches(/^\d+$/, "Contact Number field accept numeric values only"),

  location: yup.string().required("Location field cannot be blank"),

  date: yup.string().required("Registered date field cannot be blank"),
});

function Forms() {
  //REGISTER FUNCTIONs AS A REFERENCE TO DETERMINE WHICH PROPERTY YOU WANT TO VALIDATE
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //HERE THE onSubmit will grab the object which has the data coming from the form (called by the handleSubmit).

  //  // NO USE
  //  ///HERE ARE THE VARIABLES WHICH GET OR STORE THE DATA THAT IS INPUTED
  const [fullname, setfullname] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userList, setUserList] = useState([]);

  /// ADD DATA TO DATABASE----------------------------------------
  const addUser = (data) => {
    //CURRENT DATE
    const today = new Date();
    const currentDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() > 8
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)) +
      "-" +
      (today.getDate() > 9 ? today.getDate() : "0" + today.getDate());

    console.log("data " + data.date);
    console.log("current " + currentDate);

    //IF CURRENT DATE IS EQUAL TO THE DATE PICKED BY THE USER/ ALREADY FORMATTED.
    if (currentDate === data.date) {
      // Date equals today's date
      console.log("Equal");
      console.log(data);
      console.log(data.fullname + email + data.date + location + contactNumber);

      Axios.post("http://localhost:5000/user/add", {
        fullname: data.fullname,
        email: data.email,
        date: data.date,
        location: data.location,
        contactNumber: data.contactNumber,
      }).then(() => {
        setUserList([
          ...userList,
          {
            fullname: data.fullname,
            email: data.email,
            date: data.date,
            location: data.location,
            contactNumber: data.contactNumber,
          },
        ]);
      });
      window.location.reload();
    } else {
      alert("Registered date field accept current date");
    }
  };

  //  RETRIEVE/SHOW Users Data---------------------------------------
  let displayOnce=1;
 

  if (displayOnce > 0) {
    Axios.get("http://localhost:5000/user/").then((response) => {
      setUserList(response.data);
      displayOnce = 0;
      
    });
  }


  ///GET USER ID FUNCTION

  const getUserId =(data) =>{
     console.log(data);
  

  }

  return (
    <div className="App">
      <h1>Sign Up</h1>

      {/* /* "handleSubmit" will validate the inputs before calling "onSubmit" */}
      <form onSubmit={handleSubmit(addUser)}>
        <label>Full fullname:</label>
        {/* register the input into the hook by calling the "register" function */}
        <input
          className="placeHolder"
          type="text"
          placeholder="Last Name , First Name Middle Initial"
          onChange={(event) => {
            setfullname(event.target.value);
          }}
          {...register("fullname")}
          name="fullname"
        />
        {/* errors will return when field validation fails  */}
        <p>{errors.fullname?.message}</p>

        <label>Email Address:</label>
        <input
          className="placeHolder"
          placeholder="example@email.com"
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          {...register("email")}
          name="email"
        />
        <p>{errors.email?.message}</p>

        <label>Contact Number:</label>
        <input
          className="placeHolder"
          type="text"
          placeholder="09334399999"
          onChange={(event) => {
            setContactNumber(event.target.value);
          }}
          {...register("contactNumber")}
          name="contactNumber"
        />
        <p>{errors.contactNumber?.message}</p>

        <div className="col-auto my-1">
          <select
            className="form-select custom-select mr-sm-2"
            id="inlineFormCustomSelect"
            aria-label="Default select example"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            {...register("location")}
            name="location"
            placeholder=""
          >
            <option value="" disabled hidden>
              Select Location
            </option>
            <option value="Manila">Manila</option>
            <option value="Cebu">Cebu</option>
          </select>
        </div>
        <p>{errors.location?.message}</p>
        <br />

        <input
          type="date"
          name="date"
          placeholder="Choose a Date"
          format="MM-dd-yyyy"
          onChange={(date) => {
            setDate(date);
          }}
          {...register("date")}
        />

        <p>{errors.date?.message}</p>

        <button type="submit">Add User</button>
      </form>

      {/* DISPLAY THE USERS CALL  Data inside THE userList */}

      <div className="users">
        <TableContainer component={Paper} width="10%">
          <Table aria-label="caption table" width="10%">
            <caption>Barongkay</caption>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Full Name</TableCell>
                <TableCell align="right">Email Address</TableCell>
                <TableCell align="right">Contact Number</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Registered Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((val) => (
                <TableRow>
                  <TableCell align="left">{val._id}</TableCell>
                  <TableCell align="left">{val.fullname}</TableCell>
                  <TableCell align="left">{val.email}</TableCell>
                  <TableCell align="left">{val.contactNumber}</TableCell>
                  <TableCell align="left">{val.location}</TableCell>
                  <TableCell align="left">{val.date}</TableCell>

                  <TableCell align="left">
                    {/* TRANSITIONING TO DELETE COMPONENT WHEN CLICK */}
                  {/* <Link to={"/Delete/"} onClick={()=>this.getUserId(val._id)}>Delete</Link>  */}
                   <button  onClick={() => getUserId(val._id)} >Delete</button>
                  </TableCell>

                  <TableCell align="left">
                    {/* TRANSITIONING TO UPDATE COMPONENT WHEN CLICK */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div></div>
      </div>

     
    </div>
  );
}

export default Forms;
