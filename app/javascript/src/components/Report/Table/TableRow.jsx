import React from "react";

const TableRow = ({ getTableBodyProps, rows, prepareRow }) => {
  return (
    <tbody
      className="bg-white divide-y divide-bb-gray-200"
      {...getTableBodyProps()}
    >
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell, idx) => {
              return (
                <td
                  key={idx}
                  {...cell.getCellProps()}
                  className="px-6 py-4 text-sm font-medium leading-5 text-bb-gray whitespace-no-wrap break-all"
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableRow;
