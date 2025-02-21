import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "/Search.svg";
import user from "/user.png";
import Cart from "/shopping-cart.svg";
import Logo from "/Logo.png";
import Searchbar from "./Searchbar";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { SetShowSearch, GetcartCount } = useContext(ShopContext);
  const location = useLocation(); // Get the current route

  return (
    <>
      <div className="flex items-center justify-between px-10 py-5 font-bold">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img className="h-12 w-auto" src={Logo} alt="Triftopia Logo" />
        </NavLink>

        {/* Navigation Links */}
        <ul className="flex gap-12 font-light text-[17px] text-gray-700">
          {["home", "limited-access", "antique-access", "contact"].map(
            (route) => (
              <NavLink
                key={route}
                to={`/${route}`}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-all ${
                    isActive ? "font-semibold text-black" : "text-gray-700"
                  }`
                }
              >
                <p className="capitalize">{route.replace("-", " ")}</p>
                <div
                  className={`w-full h-[2px] mt-1 transition-all ${
                    location.pathname === `/${route}` ||
                    (route === "home" && location.pathname === "/")
                      ? "bg-black"
                      : "bg-transparent"
                  }`}
                />
              </NavLink>
            )
          )}
        </ul>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => SetShowSearch(true)}
            src={Search}
            className="w-5 cursor-pointer"
            alt="Search"
          />
          <div className="relative group">
            <Link to="/login">
              <img src={user} className="w-5 cursor-pointer" alt="User" />
            </Link>
            <div className="hidden group-hover:block absolute right-0 bg-gray-400 text-black rounded-2xl shadow-lg py-3 px-4 w-40">
              <p className="cursor-pointer hover:bg-gray-300 p-2 rounded">
                My Profile
              </p>
              <hr className="border-gray-700" />
              <p className="cursor-pointer hover:bg-gray-300 p-2 rounded">
                Orders
              </p>
              <hr className="border-gray-700" />
              <p className="cursor-pointer hover:bg-gray-300 p-2 rounded">
                Logout
              </p>
            </div>
          </div>
          <Link to="/cart" className="relative">
            <img src={Cart} className="w-5" alt="Cart" />
            <p className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {GetcartCount()}
            </p>
          </Link>
        </div>
      </div>
      <Searchbar />
    </>
  );
};

export default Navbar;
