import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // Load from storage
    isLoggedIn: false, // Convert to boolean
};

const authSlice = createSlice({
    name: "authProvider",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(action.payload)); // Persist login
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("user"); // Clear storage
        },
    },
});

export default authSlice;
export const authSliceActions = authSlice.actions;