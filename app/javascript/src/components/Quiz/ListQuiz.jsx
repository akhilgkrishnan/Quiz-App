import React from "react";
import Table from "./Table";

const ListQuiz = ({ data, editQuiz, destroyQuiz, showQuiz }) => {
  return (
    <Table
      data={data}
      editQuiz={editQuiz}
      destroyQuiz={destroyQuiz}
      showQuiz={showQuiz}
    />
  );
};

export default ListQuiz;
