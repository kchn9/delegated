import { Navigate } from "react-router-dom";
import routes from "../utils/providers/router/routes";

export default function ProtectedRoute(props) {
  function hasToken() {
    return localStorage.getItem("jwt") ? true : false;
  }

  return hasToken() ? props.children : <Navigate to={routes.LOGIN_PATH} />;
}
