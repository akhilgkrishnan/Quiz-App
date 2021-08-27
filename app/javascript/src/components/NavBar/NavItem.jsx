import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ name, path }) => {
  return (
    <Link
      to={path}
      className="inline-flex items-center px-1 pt-1 mr-3 font-semibold
                              text-lg leading-5 cursor-pointer underline"
    >
      {name}
    </Link>
  );
};

export default NavItem;
