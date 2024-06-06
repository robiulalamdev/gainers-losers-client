import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextComp";

const PrivateRoute = ({ children, roles = [] }) => {
  const location = useLocation();
  const { user, userLoading } = useContext(AuthContext);

  if (userLoading) {
    return <div>Loading</div>;
  }

  if (user && roles.includes(user.user.role)) {
    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
