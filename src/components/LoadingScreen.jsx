import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="loading-logo">
                    <div className="logo-icon">💰</div>
                    <h1>Bvexp Logger</h1>
                </div>
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
                <p>Loading your expense tracker...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
