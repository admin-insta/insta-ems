import React, { useEffect, useState } from "react";
import logocompany from "../components/utils/images/logocompany.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "./store/userSlice";
import Button from "../components/utils/theme/Button";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { logout } from "../api/auth";
import { toast } from "react-toastify";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [showProduct, setShowProduct] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (userData) {
      // only redirect to /userview if you're at the login page
      if (location.pathname === "/") {
        navigate("/userview");
      }
    }
  }, [userData]);
  //Handle Sign In
  const handleSignIn = () => {
    navigate("/login");
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    console.log("Logout clicked");
    const result = await logout();
    if (result.success) {
      dispatch(removeUser());
      //deleteCookie("authToken");
      navigate("/");
      toast.success("You Have Succefully Logged Off");
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-md`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Logo and Hamburger Menu Icon */}
          <div className="flex items-center space-x-4">
            <div className="lg:hidden">
              <MenuIcon
                className="text-gray-700 cursor-pointer"
                sx={{ fontSize: 28 }}
                onClick={() => setIsMobileMenuOpen(true)}
              />
            </div>

            <img
              onClick={() => {
                userData ? navigate("/userview") : navigate("/");
              }}
              className="h-10 cursor-pointer"
              alt="logo"
              src={logocompany}
            />
          </div>

          {/* Desktop Navigation */}

          {!userData && (
            <nav className="hidden lg:flex space-x-6 text-base">
              <span
                onClick={() => (user ? navigate("/userview") : navigate("/"))}
                className="cursor-pointer hover:text-blue-700 transition-all"
              >
                Home
              </span>
              <span className="cursor-pointer hover:text-blue-700 transition-all">
                Resources
              </span>
              <span className="cursor-pointer hover:text-blue-700 transition-all">
                Pricing
              </span>

              {/* Dropdown for Products */}
              <div
                className="relative cursor-pointer"
                onMouseEnter={() => setShowProduct(true)}
                onMouseLeave={() => setShowProduct(false)}
              >
                <span className="flex items-center hover:text-blue-700 transition-all">
                  Products
                  <ChevronRightOutlinedIcon
                    className={`ml-1 transition-transform duration-300 ${
                      showProduct ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </span>

                {showProduct && <ProductMenu />}
              </div>
            </nav>
          )}

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!userData && (
              <Button onClick={() => navigate("/demorequest")}>
                Request A Demo
              </Button>
            )}
            <Button onClick={userData ? handleSignOut : handleSignIn}>
              {userData ? "Logout" : "Login"}
            </Button>
            <div className="flex items-center space-x-1 cursor-pointer">
              <LanguageIcon sx={{ fontSize: 24 }} />
              <p className="text-sm">EN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (for sm, md, xs devices) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 shadow-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Menu</span>
            <CloseIcon
              className="text-gray-700 cursor-pointer hover:scale-110 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
          <nav className="mt-4 space-y-4">
            <span
              onClick={() => {
                setIsMobileMenuOpen(false);
                userData ? navigate("/userview") : navigate("/");
              }}
              className="block cursor-pointer hover:text-blue-700 transition-all"
            >
              Home
            </span>
            <span className="block cursor-pointer hover:text-blue-700 transition-all">
              Resources
            </span>
            <span className="block cursor-pointer hover:text-blue-700 transition-all">
              Pricing
            </span>

            {/* Mobile Dropdown for Products */}
            <div>
              <span
                className="flex items-center cursor-pointer hover:text-blue-700 transition-all"
                onClick={() => setShowProduct(!showProduct)}
              >
                Products
                <ChevronRightOutlinedIcon
                  className={`ml-1 transition-transform duration-300 ${
                    showProduct ? "rotate-90" : "rotate-0"
                  }`}
                />
              </span>
              {showProduct && <ProductMenu />}
            </div>

            <Button onClick={() => navigate("/demorequest")}>
              Request A Demo
            </Button>
            <Button onClick={user ? handleSignOut : handleSignIn}>
              {userData ? "Logout" : "Login"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

export const ProductMenu = React.memo(() => {
  return (
    <div className="absolute left-0 bg-white shadow-lg p-4 rounded-md w-48 md:w-56 lg:w-64 z-50">
      <ul className="text-sm">
        <li className="p-2 hover:bg-gray-100 cursor-pointer">HRMS</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Payroll System</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">
          Leave Management
        </li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">
          Attendance Management
        </li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">
          Employee Engagement
        </li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">
          Performance Management
        </li>
      </ul>
    </div>
  );
});
