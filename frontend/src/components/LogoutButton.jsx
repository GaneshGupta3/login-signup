import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { authSliceActions, logoutAsync } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logoutAsync()); // Calls API & updates Redux state
        navigate("/login");
    };

    return <IoIosLogOut style={{cursor : "pointer"}} onClick={handleLogout} size={40} />;
};

export default LogoutButton;
