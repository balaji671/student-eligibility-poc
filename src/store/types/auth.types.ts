export interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    leaNumber: string;
    county?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: any;
}

export interface LoginResponse {
    user: User;
    token: string;
}