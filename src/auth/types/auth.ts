export interface User {
	id: string;
	email?: string;
	roles?: string[];
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterData {
	username: string;
	email: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	user?: User;
	token?: string;
	error?: string;
	data?: any;
}

export interface JWTPayload {
	sub: string;
	exp: number;
	iat: number;
	email?: string;
	realm_access?: {
		roles: string[];
	};
}

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
}

export type AuthAction =
	| { type: 'LOGIN_START' }
	| { type: 'LOGIN_SUCCESS'; payload: { user: User } }
	| { type: 'LOGIN_FAILURE'; payload: string }
	| { type: 'LOGOUT' }
	| { type: 'SET_LOADING'; payload: boolean };