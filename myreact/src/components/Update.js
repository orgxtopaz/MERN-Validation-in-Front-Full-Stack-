import React from "react";
import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.
///FORM,YUP, ALL FOR VALIDATION ALSO AXIOS FOR THE API
import "./component.css";

import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
import * as yup from "yup"; //for validation
import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.

//VALIDATION REQUIREMENTS.
const schema = yup.object().shape({
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
});

function Update() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userList, setUserList] = useState([]);

  // //UPDATE DATA ON DATABASE
  let { updateId } = useParams(); //THE USER's ID WHICH BEEN PASSED THROUGH THE URL /

  const updateUser = (data) => {
   
      Axios.put(`http://localhost:5000/user/update/${updateId}`, { 
        id: updateId,
        email: data.email,
        location: data.location,
        contactNumber: data.contactNumber
        
    
    }).then(
        (response) => {
          console.log("Update Success");
        }
      );

  
    } 
    




  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

  function handleClick() {
    history.push("/"); //GOING BACK TO HOME PAGE / MAIN PAGE
  }

  const [userDetails, setUserDetails] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------


 try{
    Axios.get(`http://localhost:5000/user/view/${updateId}`).then(
        (response) => {
          setUserDetails(response.data);
        }
      );
 }catch(e){
     console.log("Get User Details Failed")
 }
   
 

  

  return (
    <>
      <form onSubmit={handleSubmit(updateUser)}>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Update Details</h5>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                value={userDetails._id}
                readOnly
                className="form-control"
              />
              <small className="form-text text-muted">We'll never .</small>
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={userDetails.fullname}
                readOnly
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder={userDetails.email}
                className="form-control"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                {...register("email")}
                name="email"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                placeholder={userDetails.contactNumber}
                className="form-control"
                onChange={(event) => {
                  setContactNumber(event.target.value);
                }}
                {...register("contactNumber")}
                name="contactNumber"
              />
              <p>{errors.contactNumber?.message}</p>
            </div>

            <div className="form-group">
              <label>Location</label>
            
                <select
                  className="form-select custom-select "
                  style ={{width:"101%"}}
                  id="inlineFormCustomSelect"
                  aria-label="Default select example"
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  {...register("location")}
                  name="location"
                  placeholder={userDetails.location}
                >
                  <option value="" hidden>
                    Select Location
                  </option>
                  <option value="Manila">Manila</option>
                  <option value="Cebu">Cebu</option>
                </select>
            
              <p>{errors.location?.message}</p>
            </div>


            <div className="form-group">
              <label>Registered Date</label>
              <input
                type="text"
                value={userDetails.date}
                readOnly
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button type="submit" onClick={handleClick} className="btn btn-primary">
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Update;
