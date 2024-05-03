import { Outlet } from "react-router-dom";
import Header from "../components/shared/header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

export default Layout;
