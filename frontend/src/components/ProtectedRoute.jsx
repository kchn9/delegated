import { Navigate } from "react-router-dom";
import routes from "../utils/providers/router/routes";
import { useContext } from "react";
import { AuthContext } from "../utils/providers/auth/authContext";

export default function ProtectedRoute(props) {
  const [authState, _] = useContext(AuthContext);
  return authState.id && authState.username ? (
    props.children
  ) : (
    <Navigate to={routes.LOGIN_PATH} />
  );
}
