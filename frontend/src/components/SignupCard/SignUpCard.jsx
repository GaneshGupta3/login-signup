import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUpCard.module.css";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import StyledButton from "../StyledButton/StyledButton.jsx";

const SignUpCard = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkUserSession = async () => {
        try {
            const response = await axios.get("/api/profile", {
                withCredentials: true, // Ensure cookies are sent
            });

            if (response.status === 200) {
                dispatch(authSliceActions.login(response.data.user)); // Save user data in Redux
                navigate("/profile"); // Redirect to profile page
            }
        } catch (error) {
            console.log("User not logged in or invalid session.");
        }
    };

    useEffect(() => {
        checkUserSession(); // Check if user is already authenticated
    }, []);

    const handleSignUp = async () => {
        console.log("signup button clicked");
        const registrationDetails = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };

        try {
            const res = await axios.post(
                "/auth/register",
                registrationDetails,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.status === 200) {
                navigate("/login");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Signup failed:", error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className={styles.mainBody}>
            <div className={styles.card}>
                <p>Sign up</p>
                <input ref={username} type="username" placeholder="username" />
                <input ref={email} type="email" placeholder="email" />
                <input ref={password} type="password" placeholder="password" />
                <StyledButton executeFunction={handleSignUp} displayText={`Signup`}>Signup</StyledButton>
                <p className={styles.signupText}>
                    Already have an account?{" "}
                    <Link style={{ color: "#ccc" }} to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpCard;
