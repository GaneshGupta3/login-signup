import React, { useRef, useEffect } from "react";
import styles from "./LoginCard.module.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice";
import StyledButton from "../StyledButton/StyledButton";
import { toast } from "react-toastify";

function LoginCard() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 🔹 Function to check if user has valid cookies
    const checkUserSession = async () => {
        try {
            const response = await axios.get("/api/user/check-auth", {
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

    // 🔹 Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email: email.current.value,
                password: password.current.value,
            };

            const response = await axios.post("/auth/login", user, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                dispatch(authSliceActions.login(response.data.user)); // Save user in Redux
                navigate("/profile"); // Redirect after login
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Something went wrong"; // Access the error message directly
            toast.error(errorMessage);
            console.error("Login failed:", errorMessage);
        }
    };

    return (
        <div className={styles.mainBody}>
            <div className={styles.card}>
                <p>Login</p>

                <input type="text" placeholder="Email" ref={email} required />
                <input
                    type="password"
                    placeholder="Password"
                    ref={password}
                    required
                />
                <StyledButton displayText={'Login'} executeFunction={handleLogin}></StyledButton>

                <p className="signup-text">
                    Don't have an account?{" "}
                    <Link style={{ color: "#ccc" }} to="/signup">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginCard;
