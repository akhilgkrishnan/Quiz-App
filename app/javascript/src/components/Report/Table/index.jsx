import React, { useMemo } from "react";
import { useTable } from "react-table";

import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Table = ({ reports }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Quiz Name",
        accessor: "quiz.title"
      },
      {
        Header: "User Name",
        accessor: d => `${d.user.first_name} ${d.user.last_name}`
      },
      {
        Header: "Email",
        accessor: "user.email"
      },
      {
        Header: "Correct Answers",
        accessor: "correct_answers"
      },
      {
        Header: "Incorrect Answers",
        accessor: "incorrect_answers"
      }
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data: reports
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="flex flex-col mt-4 ">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <TableHeader headerGroups={headerGroups} />
              <TableRow
                getTableBodyProps={getTableBodyProps}
                rows={rows}
                prepareRow={prepareRow}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
