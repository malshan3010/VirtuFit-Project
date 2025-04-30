import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { TextInput, Button } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import ss from "../assets/6350271.png";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setUser(user);
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-white-900 to-white-500 sticky w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-black"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg text-white">
            VirtuFit
          </span>
          .LK
        </Link>

          {/* Search Bar */}
          <form className="flex items-center gap-2 px-4 py-2">
  <TextInput
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="hidden lg:inline"
  />
  <Link to="http://localhost:5173/search?q=Blue%20Shirt" className="lg:hidden">
    <Button className="w-12 h-10 flex items-center justify-center" color="gray" pill>
      <AiOutlineSearch />
    </Button>
  </Link>
</form>

          <div className="flex justify-center items-center font-size-sm gap-3 md:order-2 space-x-4 md:space-x-0 rtl:space-x-reverse">
            <Link to={"/profile"} className="text-gray-700">
              <div className="flex gap-2 items-center font-semibold justify-center border-2 rounded-lg shadow-md px-2 py-1">
                <img
                  src={
                    user?.profileImage ||
                    "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png"
                  }
                  className="w-8 h-8 rounded-full object-cover"
                  alt="profile"
                />
                {user?.username?.toUpperCase()}
              </div>
            </Link>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <NavLink
                  to="http://localhost:5173/"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive ? "text-gray-600 " : "text-gray-600"
                    } md:hover:bg-transparent`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="http://localhost:5173/collection"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive ? "text-gray-600 " : "text-gray-600"
                    } md:hover:bg-transparent`
                  }
                >
                  Collection
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="http://localhost:5173/about"
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded ${
                      isActive ? "text-gray-600 " : "text-gray-600"
                    } md:hover:bg-transparent`
                  }
                >
                  About
                </NavLink>
              </li>
              {user?.role !== "user" && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded ${
                        isActive ? "text-gray-600" : "text-gray-600"
                      } md:hover:bg-transparent`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="p-0 bg-gradient-to-r from-white-100 to-white-300 w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
