import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import StyledButton from "../StyledButton/StyledButton";

const Navbar = ({ transparent }) => {

    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((store) => store.authProvider);

    const loginRedirect = ()=>{
        navigate("/login");
    }
    const signupRedirect = ()=>{
        navigate("/signup");
    }

    return (
        <nav className={`${styles.navbar} ${transparent ? styles.transparent : ""}`}>
            <div className={styles.logo}></div>
            <h1>About Us</h1>
            <h1>Problems</h1>
            <h1>Rankings</h1>
            <h1>Contact Us</h1>
            {!isLoggedIn && <div>
                <StyledButton executeFunction={loginRedirect} displayText={"Login"}></StyledButton>
                <StyledButton executeFunction={signupRedirect} displayText={"Signup"}>Signup</StyledButton>
            </div>}
            {isLoggedIn && <LogoutButton />}
        </nav>
    );
};

export default Navbar;
