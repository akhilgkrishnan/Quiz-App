import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  type = "button",
  buttonText,
  onClick,
  loading,
  iconClass,
  path = "",
  styleClass
}) => {
  if (type === "link") {
    return (
      <Link
        to={path}
        className={`${styleClass} relative flex justify-center w-full px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-md
         group hover:bg-opacity-90 focus:outline-none`}
      >
        {iconClass && <i className={`${iconClass} text-xl mr-2`} />}
        {loading ? "Loading..." : buttonText}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styleClass} relative flex justify-center w-full px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-bb-purple border border-transparent rounded-md
         group hover:bg-opacity-90 focus:outline-none`}
    >
      {iconClass && <i className={`${iconClass} text-xl mr-2`} />}
      {loading ? "Loading..." : buttonText}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func
};
export default Button;
