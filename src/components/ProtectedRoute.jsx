import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import CustomLoader2 from "./Loaders/CustomLoader2";

const ProtectedRoute = ({ 
  authTokenKey,
  userType,
  redirectPath = "/unauthorized"
}) => {
  const [authStatus, setAuthStatus] = useState("checking"); // "checking", "authenticated", "unauthenticated"

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem(authTokenKey);
      
      if (!token) {
        setAuthStatus("unauthenticated");
        return;
      }

      try {
        // Determine the verification endpoint based on userType
        const verificationEndpoint = userType === "admin"
          ? "https://djsnss-web.onrender.com/admin/verify-token"
          : "https://djsnss-web.onrender.com/volunteer/verify-token";
          
        // Verify token with backend
        const response = await axios.get(
          verificationEndpoint,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.status === 200) {
          setAuthStatus("authenticated");
        } else {
          // Token is invalid
          localStorage.removeItem(authTokenKey); // Clear invalid token
          setAuthStatus("unauthenticated");
        }
      } catch (error) {
        // Token validation failed
        console.error("Token verification failed:", error);
        localStorage.removeItem(authTokenKey); // Clear invalid token
        setAuthStatus("unauthenticated");
      }
    };

    verifyToken();
  }, [authTokenKey, userType]);

  if (authStatus === "checking") {
    return <div className="min-h-screen w-screen flex items-center justify-center bg-cream">
        <CustomLoader2 />
      </div>;
  }

  return authStatus === "authenticated" ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;