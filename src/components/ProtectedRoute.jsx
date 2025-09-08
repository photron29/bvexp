import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, user } = useAuth();

    // console.log('ProtectedRoute - loading:', loading, 'user:', user, 'isAuthenticated:', isAuthenticated());

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
