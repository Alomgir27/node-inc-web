import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const tokens = JSON.parse(localStorage.getItem("tokens"));

  if (!tokens) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
export default PrivateRoute;
