import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on app start
    useEffect(() => {
        const savedUser = localStorage.getItem('bvexp_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('bvexp_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        // Simple authentication - in a real app, this would be an API call
        // For demo purposes, we'll use hardcoded credentials
        const validCredentials = {
            'namika': 'iloveyou',

        };

        console.log('Login attempt:', { username, password }); // Debug log

        if (validCredentials[username] && validCredentials[username] === password) {
            const userData = {
                username,
                loginTime: new Date().toISOString()
            };

            console.log('Login successful, setting user:', userData); // Debug log
            setUser(userData);
            localStorage.setItem('bvexp_user', JSON.stringify(userData));
            return { success: true };
        } else {
            console.log('Login failed - invalid credentials'); // Debug log
            return {
                success: false,
                error: 'Invalid username or password'
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('bvexp_user');
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
