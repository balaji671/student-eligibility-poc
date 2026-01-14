import { createSlice } from "@reduxjs/toolkit";

class IUser {
    id: string | null = null;
    name: string | null = null;
    email: string | null = null;
}

class IAuthState {
    user: IUser | null = null;
    isOTPVerified: boolean | null = null;
}

const initialState: IAuthState = {
    user: null,
    isOTPVerified: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // your reducers here
    },
});

export default authSlice.reducer;