import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import CountryList from "../pages/CountryList.jsx";
import Home from "../pages/Home.jsx";
import Signin from "../pages/Signin.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/country-list",
        element: (
          <PrivateRoute roles={["admin"]}>
            <CountryList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
