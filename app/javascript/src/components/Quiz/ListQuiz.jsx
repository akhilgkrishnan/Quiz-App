import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, editQuiz }) => {
  return <Table data={data} editQuiz={editQuiz} />;
};

export default ListQuiz;
