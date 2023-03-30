import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function SubNotRequire({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  <Navigate to="/subscription" state={{ from: location }} replace />;

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  //   // toanswer: set Location để useLocation
  // }

  return children;
}

export default SubNotRequire;
