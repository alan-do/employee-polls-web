import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ children }) => {
  const authenticatedUser = useSelector((state) => state.authenticatedUser);
  const redirectUrl = window.location.href.toString().split(window.location.host)[1];

  console.log('redirectUrl', redirectUrl);
  
  return authenticatedUser ? children : <Navigate to={`/login?redirectTo=${redirectUrl}`} />;
};

export default PrivateRoute;