import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../store/authSlice"; // Import missing auth actions
import LogoutButton from "./LogoutButton";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.authProvider);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await axios.get("/api/profile", {
                    withCredentials: true, // Ensure cookies are sent
                });

                if (response.status === 200) {
                    dispatch(authSliceActions.login(response.data.user)); // Save user in Redux
                }
            } catch (error) {
                navigate("/login"); // Redirect if unauthorized
            }
        };

        checkUserSession(); // Run authentication check
    }, [dispatch, navigate]); // Include dependencies

    // Handle case where user data is still loading
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>Hello, {user.username}!</div>
            <LogoutButton></LogoutButton>
        </>
    );
};

export default ProfilePage;
