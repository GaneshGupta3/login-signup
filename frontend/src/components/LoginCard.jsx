import React, { useRef, useState } from "react";
import "./LoginCard.css";
import { useSelector } from "react-redux";

function LoginCard() {
    const username = useRef();
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Welcome, ${username.current.value}!`);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <p>Sign in to continue</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        ref = {username}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="signup-text">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
}

export default LoginCard;
