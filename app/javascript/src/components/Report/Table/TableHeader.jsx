import React from "react";

const TableHeader = ({ headerGroups }) => {
  return (
    <thead className="bg-purple-300">
      {headerGroups.map((headerGroup, key) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={key}>
          {headerGroup.headers.map((column, idx) => (
            <th
              className="px-5 py-3 text-base font-bold leading-4 tracking-wider
                  text-left text-bb-gray-600 text-opacity-50 bg-gray-50"
              {...column.getHeaderProps()}
              key={idx}
            >
              {column.render("Header")}
            </th>
          ))}
          <th className="w-1"></th>
          <th className="w-1"></th>
        </tr>
      ))}
    </thead>
  );
};

export default TableHeader;
