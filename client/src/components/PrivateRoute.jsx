import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../api/authAPI';

const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Send request to validate token
        const response = await verifyToken(token);

        console.log('Backend response:', response);
        // Check if token is valid
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {

        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    validateToken();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Rredirect to login page if not authorize
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
