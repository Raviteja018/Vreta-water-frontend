import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        userType: null,
        isAuthenticated: false,
    },
    reducers:{
        login:(state, action) => {
            state.userType = action.payload.userType;
            state.isAuthenticated = true;
        },
        logout:(state) => {
            state.userType = null;
            state.isAuthenticated = false;
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;