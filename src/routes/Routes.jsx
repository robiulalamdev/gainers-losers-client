import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import Signin from "../pages/Signin.jsx";
import CountryList from "../pages/CountryList.jsx";

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
        element: <CountryList />,
      },
    ],
  },
]);
