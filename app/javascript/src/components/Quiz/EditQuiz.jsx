import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuizForm from "components/Quiz/Form/QuizForm";
import PageLoader from "components/PageLoader";
import quizApi from "apis/quiz";

const EditQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizApi.update(id, { quiz: { title } });
      history.push("/");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizApi.show(id);
      setTitle(response.data.quiz.title);
      logger.info(response.data.quiz.title);
    } catch (error) {
      Logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      {title ? (
        <QuizForm
          title={title}
          setTitle={setTitle}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      ) : (
        <h1 className="text-xl text-center text-gray-500 flex grid-rows-5 justify-center self-center mt-20">
          Quiz Not Found
        </h1>
      )}
    </Container>
  );
};

export default EditQuiz;
