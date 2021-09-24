import React from "react";
import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.
import "bootstrap/dist/css/bootstrap.min.css";

import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

function View() {
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

  function handleClick() {
    history.push("/"); //GOING BACK TO HOME PAGE / MAIN PAGE
  }

  const [userDetails, setUserDetails] = useState([]);

  let { viewId } = useParams();

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------
  let displayOnce = 1;

  if (displayOnce > 0) {
    displayOnce = 0;
    Axios.get(`http://localhost:5000/user/view/${viewId}`).then((response) => {
      setUserDetails(response.data);
    });
  }

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">User Details</h5>

          <p className="card-text">ID: {userDetails._id}</p>
          <p className="card-text">Full Name: {userDetails.fullname}</p>
          <p className="card-text">Email Address: {userDetails.email}</p>
          <p className="card-text">
            Contact Number: {userDetails.contactNumber}
          </p>
          <p className="card-text">Location: {userDetails.location}</p>
          <p className="card-text">Registered Date: {userDetails.date}</p>
          <button onClick={handleClick} className="btn btn-primary">
            Back
          </button>
        </div>
      </div>
    </>
  );
}

export default View;
