import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUpCard.module.css";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../StyledButton/StyledButton.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye,IoEyeOff } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const SignUpCard = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSigningUp } = useSelector((store) => store.authProvider);
    const [showPassword , setShowPassword] = useState(false);

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

    const handleSignUp = async (e) => {

        e.preventDefault();
        console.log("signup button clicked");
    
        // Validate input fields
        if (!username.current.value || !email.current.value || !password.current.value) {
            toast.error("Enter all details", {
                position: "top-right",
                autoClose: 3000,
            });
            return; // Prevent further execution
        }
    
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
                    headers: { "Content-Type": "application/json" },
                }
            );
    
            if (res.status === 200) {
                toast.success("Registration successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/login");
            } else {
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.response?.data?.message || "Something went wrong!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    

    return (
        <div className={styles.mainBody}>
            <div className={styles.card}>
                <p>Sign up</p>
                <div className={styles.usernameDiv}>
                    <CiUser size={25} className={styles.userIcon}/>
                    <input ref={username} type="username" placeholder="username" />
                </div>
                <div className={styles.emailDiv}>
                    <MdOutlineMailOutline size={25} className={styles.emailIcon}/>
                    <input ref={email} type="email" placeholder="email" />
                </div>
                <div className={styles.passwordDiv}>
                    <FaLock size={23} className={styles.passwordIcon}/>
                    <input ref={password} type={showPassword ? "text" : "password"} placeholder="password" />
                    {!showPassword && <IoEye className={styles.eyeButton} size={25} onClick={()=>setShowPassword(true)}/>}
                    {showPassword && <IoEyeOff className={styles.eyeButton} size={25} onClick={()=>setShowPassword(false)}/>}
                </div>
                <StyledButton executeFunction={handleSignUp} displayText={`Signup`}>Signup</StyledButton>
                <p className={styles.signupText}>
                    Already have an account?{" "}
                    <Link style={{ color: "#ccc" }} to="/login">
                        Login
                    </Link>
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUpCard;
