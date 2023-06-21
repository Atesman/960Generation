
import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    console.log('Checking auth...');
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.log('No token found, redirecting...');
      return <Redirect to="/login-signup" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
