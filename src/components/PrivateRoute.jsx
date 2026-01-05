import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext.jsx'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({children}) => {
    const {token} = useContext(UserContext);
    if (!token){
      return <Navigate to="/login" replace />; 
    }

    return children;
}

export default PrivateRoute;