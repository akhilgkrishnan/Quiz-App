import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, editQuiz, destroyQuiz }) => {
  return <Table data={data} editQuiz={editQuiz} destroyQuiz={destroyQuiz} />;
};

export default ListQuiz;
