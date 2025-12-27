import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "./Components/Loader";
import { useApi } from "./ApiProvider";

export const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔒 ProtectedRoute: Checking authentication...");
      
      // Check if token exists in localStorage
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.log("❌ No access token found in localStorage");
        setAuthorized(false);
        return;
      }

      const [user, status, error] = await api.get("/me/");
      
      if (error) {
        console.error("❌ Authentication failed:", error, "Status:", status);
        
        // Clear tokens on auth failure
        if (status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        }
        
        setAuthorized(false);
        return;
      }

      console.log("✅ Authentication successful:", user.username);
      const isStaff = user.is_staff === 1 || user.is_staff === true;
      console.log("isStaff", isStaff);
      
      if (location.pathname === "/DashboardAdmin/" && !isStaff) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();
  }, [location.pathname, api]);

  if (authorized === null) return <Loader />;

  return authorized ? children : <Navigate to="/login" replace />;
};
