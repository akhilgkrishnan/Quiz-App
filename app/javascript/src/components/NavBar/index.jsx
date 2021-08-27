import React, { useContext } from "react";

import NavItem from "./NavItem";
import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "src/helpers/storage";
import { UserLoggedInContext } from "src/App";

const NavBar = () => {
  const userName = getFromLocalStorage("userName");
  const isLoggedIn = useContext(UserLoggedInContext);
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        isLoggedIn: false,
        email: null,
        userId: null,
        userName: null
      });
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <nav className="bg-white px-2 py-2 border-2 border-black">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-mono text-4xl font-bold cursor-pointer">
              <a className="cursor-pointer" href="/">
                Quizzy
              </a>
            </h1>
          </div>
          {isLoggedIn && (
            <div>
              <NavItem name="Reports" path="/" />
              <NavItem name={userName} path="/" />
              <a
                className="inline-flex items-center px-1 pt-1 mr-3 font-semibold
                                      text-lg leading-5 cursor-pointer underline"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
