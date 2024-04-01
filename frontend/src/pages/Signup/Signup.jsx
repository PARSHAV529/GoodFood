import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import InputControl from "../InputControl/InputControl";
import { auth } from "../../firebase.js";
import { fetchUserData, user } from "../../store/userInfo/userSlice.js";

import styles from "./Signup.module.css";

function Signup({ role }) {
  const navigate = useNavigate();
 const [loading,setLogin]=useState(false)

  const dispatch = useDispatch();
  const userinfo = useSelector(user);
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    role: role
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const addToDatabase = async (email, role) => {
  
    // Create a new user instance
  let data = {
  email: email,
  role: role,
  }
  
  try {
  
  const res =await fetch(`https://goodfood-909g.onrender.com/api/add-user`,{
    method: 'POST',
    headers : { 'Content-Type': 'application/json'},
    body:JSON.stringify(data)
  
  })
  
  } catch (error) {
  console.error(error)
  }
  
  
    
  };

  useEffect(() => {
    if (userinfo.role) {
      setLogin(false)
      if (userinfo.role === "user") {

      navigate(`/provider/${userinfo && userinfo.providerid}`)
      } else if (userinfo.role === "provider") {
        navigate("/admin/orders");
      }
    }
  }, [userinfo]);

  const handleSubmission = async () => {
    setLogin(true)
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      setLogin(false)
      return;
    }
    setErrorMsg("");
    
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);


        addToDatabase(values.email, role);

        // Dispatch action to fetch user data
        dispatch(fetchUserData({ email: values.email }));

        // Proceed with navigation logic based on user role
     
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    
    <div className={styles.container}>
      {loading && <div className="loader z-10  " />}
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          type="password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to={'/Login'}>Log In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
