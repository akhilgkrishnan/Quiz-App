import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import quizApi from "apis/quiz";
import ListQuestions from "components/Question/ListQuestions";
import questionApi from "apis/question";

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

  const handleDeleteQuestion = async question_id => {
    try {
      await questionApi.destroy(id, question_id);
      fetchQuizDetails();
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handlePublish = async e => {
    e.preventDefault();
    try {
      await quizApi.publish(id);
      setLoading(true);
      fetchQuizDetails();
    } catch (error) {
      logger.error(error);
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
        <div className="flex flex-col mt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-gray-600">{quiz.title}</h1>
            <div className="flex flex-row gap-4">
              <Button
                type="link"
                buttonText="Add question"
                iconClass="ri-add-line"
                path={`/quiz/${quiz.id}/questions/create`}
              />
              <div>
                {!quiz.slug && (
                  <Button
                    type="button"
                    buttonText="Publish"
                    onClick={handlePublish}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {quiz.slug && (
          <div className="mt-4 font-semibold flex items-center">
            <i className="ri-checkbox-circle-fill px-1"></i>
            <span className="pr-1">Published, your public link is -</span>
            <a
              href={`${window.location.origin}/public/${quiz.slug}`}
              className="text-indigo-500"
              target="_blank"
              rel="noreferrer"
            >
              {window.location.origin}/public/{quiz.slug}
            </a>
          </div>
        )}
        <ListQuestions
          quiz_id={id}
          questions={questions}
          handleDeleteQuestion={handleDeleteQuestion}
        />
      </Container>
    );
  }
  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium mt-6 text-gray-600">
            {quiz.title}
          </h1>
          <div>
            <Button
              type="link"
              buttonText="Add question"
              iconClass="ri-add-line"
              path={`/quiz/${quiz.id}/questions/create`}
              loading={loading}
            />
          </div>
        </div>
      </div>
      <h1 className="text-xl text-center text-gray-500 flex grid-rows-5 justify-center self-center mt-20">
        There are no questions in this quiz.
      </h1>
    </Container>
  );
};

export default showQuiz;
