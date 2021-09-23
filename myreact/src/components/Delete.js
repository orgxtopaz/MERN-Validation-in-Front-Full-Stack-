import React from 'react'
import { useParams } from 'react-router-dom';
///FORM,YUP, ALL FOR VALIDATION ALSO AXIOS FOR THE API
import "./component.css";
// import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
// import { useForm } from "react-hook-form"; //custom hook for managing forms with ease.
// import * as yup from "yup"; //for validation
// import { yupResolver } from "@hookform/resolvers/yup"; //Define object schema and its validation.
// import Axios from "axios"; //allows us to make GET and POST requests from the browser.



 
function Delete() {

  //    //DELETE DATA ON DATABASE------------------------------------------
  // const [userList, setUserList] = useState([]);
  // const deleteUser = (_id) => {
  //   Axios.delete(`http://localhost:5000/user/delete/${_id}`).then(
  //     (response) => {
  //       setUserList(
  //         userList.filter((val) => {
  //           return val.id !== _id;
  //         })
  //       );
  //     }
  //   );
  // };
   
  let {id}=useParams();
    return (
        <div>
            <h1>DELETE {id}</h1>
 
        </div>
    )
}

export default Delete
