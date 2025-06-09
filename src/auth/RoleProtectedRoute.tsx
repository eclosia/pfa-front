import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';


interface RoleProtectedRouteProps {
    children: ReactNode;
    requiredRole: string;
}

export const RoleProtectedRoute = ({ children, requiredRole }: RoleProtectedRouteProps) => {

    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return <div>loading...</div>; // TODO: create a custom loading component
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    const hasRole = (role: string) => user?.roles?.includes(role);

    if (!hasRole(requiredRole)) {
        // Redirect to unauthorized page 
        
        return <Navigate to="/" replace />; //TODO: Create unauthorized page
    }

    return <>{children}</>;
}; 