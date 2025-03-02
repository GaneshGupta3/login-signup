import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/authSlice";
import styles from "./ProfilePage.module.css";
import LogoutButton from "../Logout/LogoutButton";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.authProvider);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await axios.get("/api/profile", {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    dispatch(authSliceActions.login(response.data.user));
                }
            } catch (error) {
                console.error("Session expired or unauthorized", error);
                dispatch(authSliceActions.logout());
                navigate("/login");
            }
        };

        checkUserSession();
    }, [dispatch, navigate]);

    if (!user) {
        return <div className={styles.loader}>Loading...</div>; // Use loader class
    }

    return (
        <div className={styles.profileBody}>
            <h2>Hello, {user.username}!</h2>
            <LogoutButton />
        </div>
    );
};

export default ProfilePage;
