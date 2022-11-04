import { Navigate } from "react-router-dom";
import routes from "../utils/providers/router/routes";
import userHelper from "../utils/userHelper";

export default function ProtectedRoute(props) {
  return userHelper.hasToken() ? (
    props.children
  ) : (
    <Navigate to={routes.LOGIN_PATH} />
  );
}
