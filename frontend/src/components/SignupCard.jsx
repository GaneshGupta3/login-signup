import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignUpCard.module.css"

const SignUpCard = () => {
  const handleSignUp = ()=>{
    console.log("signup button clicked");
  }
    return (
        <div className={styles.backgroundImage}>
            <div className={styles.card}>
                <p>Sign up</p>
                <input type="username" placeholder="username" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button onClick={handleSignUp}>Signup</button>
                <p className={styles.signupText}>
                    Already have an account? <Link style={{color : "#ccc"}} to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpCard;
