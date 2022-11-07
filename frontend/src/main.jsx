import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./utils/providers/auth/authContext";
import { RouterProvider } from "react-router-dom";
import Router from "./utils/providers/router/browserRouter";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={Router} />
  </AuthProvider>
);
