import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, user } from "../../store/userInfo/userSlice.js";
import InputControl from "../InputControl/InputControl";
import { auth, provider, firebaseConfig } from "../../firebase.js";
import styles from "./Login.module.css";

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

function Login({googleRole}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchuser = useSelector(user);
  const [isLoading, setIsLoading] = useState(true);

  const role = fetchuser.role;


  const [values, setValues] = useState({
    email: "",
    pass: "",
    role: role,
  });

  
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
  
    setIsLoading(false);
 
     
    if (role === "user") {
      
      fetchuser && fetchuser.providerid ? navigate(`/provider/${fetchuser && fetchuser.providerid }`) : navigate('/');

    } else if (role === "provider") {
      
      navigate("/admin/orders");
    }
  }, [role]); // Navigate when role changes

  const googleSingin =  () => {
    setIsLoading(false);

    signInWithPopup(auth, provider).then( async (data) => {
      let email = data.user.email;
      console.log(data)
      fetchuser && fetchuser.providerid ? navigate(`/provider/${fetchuser && fetchuser.providerid }`) : navigate('/');

      dispatch(fetchUserData({ email }));
      if(!role){
        await addToDatabase(email,googleRole)
        dispatch(fetchUserData({ email }));

      }
      
      // Dispatch action to fetch user data
      
    });
  };

  const handleSubmission = () => {
    setIsLoading(true);

    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      setIsLoading(false);

      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        let email = values.email;
        // Dispatch action to fetch user data
        dispatch(fetchUserData({ email }));
      })
      .catch((err) => {   
         setIsLoading(false);

        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    isLoading ?  <div className="loader " /> :
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
          type='Password'
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to={'/user/register'}>Register</Link>
            </span>
            
          </p>
          <GoogleButton
            className="ml-20 !rounded-md"
            type="light"
            onClick={googleSingin}
          >
            Sign in with Google
          </GoogleButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
