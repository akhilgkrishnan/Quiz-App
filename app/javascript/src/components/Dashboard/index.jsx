import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import quizApi from "apis/quiz";
import ListQuiz from "components/Quiz/ListQuiz";

const Dashboard = ({ history }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const response = await quizApi.list();
      setQuizzes(response.data.quizzes);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (!either(isNil, isEmpty)(quizzes)) {
    return (
      <Container>
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium mt-6">List of Quizzes</h1>
            <div className="mt-6">
              <Button
                type="link"
                buttonText="Add new quiz"
                iconClass="ri-add-line"
                path={"/quiz/create"}
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 ">
            <ListQuiz data={quizzes} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <div className="flex justify-end">
          <div className="mt-6">
            <Button
              type="link"
              buttonText="Add new quiz"
              iconClass="ri-add-line"
              path={"/quiz/create"}
            />
          </div>
        </div>
        <h1 className="text-xl text-center text-gray-500 flex grid-rows-5 justify-center self-center mt-20">
          You have not created any quiz
        </h1>
      </div>
    </Container>
  );
};

export default Dashboard;
