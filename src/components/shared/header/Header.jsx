import { Link, useNavigate } from "react-router-dom";
import navBrand from "../../../assets/nav-brand.png";
import { useAuth } from "../../../contexts/AuthContextComp";

const Header = () => {
  const { user, userLogout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    userLogout();
    navigate("/signin");
  };

  return (
    <header className="bg-[#2a5574] py-6">
      <div className="container flex flex-wrap gap-4 lg:gap-0 items-center justify-between px-5">
        <div className="nab_brand">
          <Link to="/">
            <img src={navBrand} alt="nav-brand" />
          </Link>
        </div>
        {/* {!user && (
          <Link to="/signin">
            <button className="py-3 px-8 bg-white rounded-full text-base font-normal text-[#212121]">
              Sign In
            </button>
          </Link>
        )} */}

        {user && (
          <div className="space-x-3">
            <Link to="/country-list">
              <button className="py-3 px-8 bg-white rounded-full text-base font-normal text-[#212121]">
                Country List
              </button>
            </Link>
            <button
              onClick={logoutHandler}
              className="py-3 px-8 bg-white rounded-full text-base font-normal text-[#212121]"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
