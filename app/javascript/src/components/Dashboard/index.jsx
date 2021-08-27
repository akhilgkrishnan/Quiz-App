import React from "react";

import Container from "components/Container";
import Button from "components/Button";

const Dashboard = ({ history }) => {
  return (
    <Container>
      <div>
        <div className="flex justify-end">
          <Button buttonText="Add new quiz" iconClass="ri-add-line" />
        </div>
        <h1 className="text-xl text-center text-gray-500 flex grid-rows-5 justify-center self-center mt-20">
          You have not created any quiz
        </h1>
      </div>
    </Container>
  );
};

export default Dashboard;
