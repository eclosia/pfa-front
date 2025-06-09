import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { authService } from './authService';
import { AuthState, AuthAction, LoginCredentials, AuthResponse, User } from './types/auth';

interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<AuthResponse>;
    logout: () => void;
    authService: typeof authService;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
    });

    useEffect(() => {
        // Check if user is already authenticated on app start
        if (authService.isAuthenticated()) {
            const user = authService.getUserFromToken();
            if (user) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user },
                });
            }
        }
    }, []);

    const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
        dispatch({ type: 'LOGIN_START' });

        const result = await authService.login(credentials);

        if (result.success && result.user) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: result.user },
            });
        } else {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: result.error || 'Login failed',
            });
        }

        return result;
    };

    const logout = (): void => {
        authService.logout();
        dispatch({ type: 'LOGOUT' });
    };

    const value: AuthContextType = {
        ...state,
        login,
        logout,
        authService,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};