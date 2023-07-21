import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin({ children }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn || !user) {
    // If the user is not logged in or user object is null
    return <Navigate to="/admin/login" />;
  } else if (user.role === "Admin") {
    console.log("User role: Admin");
    return children;
  } else {
    console.log("User role:", user.role);
    return <Navigate to="/admin/signup" />;
  }
}

export default IsAdmin;
