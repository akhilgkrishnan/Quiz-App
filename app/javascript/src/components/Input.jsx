import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  removableOption = false,
  removableAction,
  required = true
}) => {
  return (
    <div className="md:flex md:items-center mt-6">
      <div className="md:w-2/6">
        {label && (
          <label
            className="block text-md font-medium
                leading-5 text-gray-600 md:text-left pr-5"
          >
            {label} :
          </label>
        )}
      </div>
      <div className="md:w-3/6 mb-1 rounded-md shadow-sm">
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full px-3 py-2 placeholder-gray-400
          transition duration-150 ease-in-out border
          border-gray-300 rounded-md appearance-none
          focus:outline-none focus:shadow-outline-blue
          focus:border-blue-300 sm:text-sm sm:leading-5"
        />
      </div>
      {removableOption && (
        <div className="md:w-1/6">
          <i
            className="ml-8 ri-subtract-line hover: shadow-xs cursor-pointer rounded bg-red-700 p-1"
            onClick={removableAction}
          ></i>
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.node,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default Input;
