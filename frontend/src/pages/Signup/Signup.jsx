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
    // Your logic to add user to the database after signup
  };

  useEffect(() => {
    if (userinfo.role) {
      if (userinfo.role === "user") {
        navigate("/");
      } else if (userinfo.role === "provider") {
        navigate("/admin/orders");
      }
    }
  }, [userinfo]);

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        // Dispatch action to fetch user data
        dispatch(fetchUserData({ email: values.email }));

        // Proceed with navigation logic based on user role
        addToDatabase(values.email, role);
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className={styles.container}>
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
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to={role === 'user' ? '/user/Login' : '/provider/Login'}>Log In</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
