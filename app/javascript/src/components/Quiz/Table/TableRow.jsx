import React, { Fragment } from "react";
import Button from "components/Button";

const TableRow = ({ getTableBodyProps, rows, prepareRow }) => {
  return (
    <tbody
      className="bg-white divide-y divide-bb-gray-600"
      {...getTableBodyProps()}
    >
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} key={row.original.id}>
            {row.cells.map((cell, idx) => {
              return (
                <Fragment key={idx}>
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-3 text-sm break-all font-medium leading-5 max-w-xs cursor-pointer"
                  >
                    {cell.render("Cell")}
                  </td>
                  <td className="px-3 py-4 text-sm text-center font-medium leading-5 whitespace-no-wrap">
                    <Button
                      type="link"
                      iconClass="ri-pencil-line mr-2"
                      buttonText="Edit"
                    />
                  </td>
                  <td className="px-3 py-4 text-sm text-center font-medium leading-5 whitespace-no-wrap">
                    <div className="">
                      <Button
                        iconClass="ri-delete-bin-line mr-2"
                        buttonText="Delete"
                        styleClass="bg-bb-red hover:bg-red-400 focus:shadow-outline focus:outline-none"
                      />
                    </div>
                  </td>
                </Fragment>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableRow;
