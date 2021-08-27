import React from "react";

import NavItem from "./NavItem";
import { getFromLocalStorage } from "src/helpers/storage";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");

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
          <div>
            <NavItem name={userName} path="/" />
            <a
              className="inline-flex items-center px-1 pt-1 mr-3 font-semibold
                                      text-lg leading-5 cursor-pointer underline"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
