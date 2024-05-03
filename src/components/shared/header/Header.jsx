import { Link } from "react-router-dom";
import navBrand from "../../../assets/nav-brand.png";

const Header = () => {
  return (
    <header className="bg-[#73C2FB] py-6">
      <div className="container flex flex-wrap gap-4 lg:gap-0 items-center justify-between px-5">
        <div className="nab_brand">
          <Link to="/">
            <img src={navBrand} alt="nav-brand" />
          </Link>
        </div>
        <Link to="/signin">
          <button className="py-3 px-8 bg-white rounded-full text-base font-normal text-[#212121]">
            Sign In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
