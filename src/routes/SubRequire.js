import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

function SubRequire({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  if (!user?.subscription?.isSubscription) {
    let text =
      "You have to subscribe to create your story. Do you want to make one?";

    if (window.confirm(text) === true) {
      return <Navigate to="/subscription" state={{ from: location }} replace />;
    } else {
      return <Navigate to={from} />;
    }
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  //   // toanswer: set Location để useLocation
  // }

  return children;
}

export default SubRequire;
