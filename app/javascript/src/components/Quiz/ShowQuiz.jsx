import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import quizApi from "apis/quiz";

const showQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchQuizDetails = async () => {
    try {
      const response = await quizApi.show(id);
      setQuiz(response.data.quiz);
      setQuestions(response.data.questions);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }
  if (!either(isNil, isEmpty)(questions)) {
    return (
      <Container>
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-medium mt-6 text-gray-600">
              {quiz.title}
            </h1>
            <div className="mt-6">
              <Button
                type="link"
                buttonText="Add question"
                iconClass="ri-add-line"
                path={`/quiz/${quiz.id}/questions/create`}
              />
            </div>
          </div>
          <div> List of questions </div>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium mt-6 text-gray-600">
            {quiz.title}
          </h1>
          <div className="mt-6">
            <Button
              type="link"
              buttonText="Add question"
              iconClass="ri-add-line"
              path={`/quiz/${quiz.id}/questions/create`}
              loading={loading}
            />
          </div>
        </div>
        <h1 className="text-xl text-center text-gray-500 flex grid-rows-5 justify-center self-center mt-20">
          There are no questions in this quiz.
        </h1>
      </div>
    </Container>
  );
};

export default showQuiz;
