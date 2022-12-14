import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import ProtectedRoute from "../../../components/ProtectedRoute";
import {
  Root,
  Trips,
  AddNewTrip,
  TripView,
  Map,
  LandingPage,
  Dashboard,
  RegisterPage,
  LoginPage,
} from "../../../pages";
import { setAuthToken } from "../axios/axiosHelper";
import tripsAPI from "../../api/trips";

export default createBrowserRouter([
  {
    path: routes.ROOT_PATH,
    element: <Root />,
    children: [
      {
        path: routes.HOME_PATH,
        element: <LandingPage />,
      },
      {
        path: routes.DASHBOARD_PATH,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: routes.TRIPS_PATH,
            element: <Trips />,
          },
          {
            path: routes.NEW_TRIP_PATH,
            element: <AddNewTrip />,
          },
          {
            path: routes.TRIP_PATH,
            element: <TripView />,
            loader: ({ params }) => {
              setAuthToken(JSON.parse(localStorage.getItem("jwt")));
              return tripsAPI.getTripDetails(params.id);
            },
          },
          {
            path: routes.MAP_PATH,
            element: <Map />,
          },
        ],
      },
    ],
  },
  {
    path: routes.LOGIN_PATH,
    element: <LoginPage />,
  },
  {
    path: routes.REGISTER_PATH,
    element: <RegisterPage />,
  },
]);
