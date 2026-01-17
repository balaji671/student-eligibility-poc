import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginResponse } from '../types/auth.types';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

// Mock API Service - Ready for replacement with your apiInstance
const loginService = async (credentials: any): Promise<{ status: number; data: LoginResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    user: {
                        id: 1, firstName: 'John', lastName: 'Doe', role: "ADMIN", leaNumber: "999", county: "Orange"
                    },
                    token: "demo_token_12345"
                }
            });
        }, 1000);
    });
};

export const loginUser = createAsyncThunk("auth/login",
    async ({ credentials, navigate }: { credentials: any; navigate: any }, { rejectWithValue }) => {
        try {
            const response = await loginService(credentials);
            if (response?.status === 200) {
                toast.success("Authenticated Successfully")

                navigate('/dashboard');
                return response.data;
            }
            return rejectWithValue(response);
        } catch (error) {
            let axiosError = error as AxiosError<{ message: string }>
            toast.error(axiosError?.response?.data?.message || "Invalid Credentials")
            return rejectWithValue(error);
        }
    }
);

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('demo_token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;