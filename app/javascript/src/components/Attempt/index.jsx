import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import attemptApi from "apis/attempt";
import AttemptLogin from "components/Attempt/AttemptLogin";
import Assessment from "./Assessment";
import AssessmentResult from "./AssessmentResult";

const Attempt = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState({});
  const [showAssessment, setShowAssessment] = useState(false);
  const [userAttempted, setUserAttempted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [seletedOptions, setSeletedOptions] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [inCorrectAnswersCount, setInCorrectAnswersCount] = useState(0);

  const fetchQuizDetails = async () => {
    try {
      const response = await attemptApi.show(slug);
      setQuizName(response.data.quiz.title);
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

  if (userAttempted) {
    return (
      <Container>
        <div className="mt-6 flex justify-center">
          <h1 className="text-2xl font-bold">
            You already attempted this quiz.
          </h1>
        </div>
      </Container>
    );
  }

  if (showResult) {
    return (
      <Container>
        <AssessmentResult
          quizName={quizName}
          questions={questions}
          seletedOptions={seletedOptions}
          correctAnswersCount={correctAnswersCount}
          inCorrectAnswersCount={inCorrectAnswersCount}
        />
      </Container>
    );
  }
  return (
    <Container>
      {!showAssessment ? (
        <AttemptLogin
          slug={slug}
          quizName={quizName}
          setUser={setUser}
          loading={loading}
          setLoading={setLoading}
          setShowAssesment={setShowAssessment}
          setUserAttempted={setUserAttempted}
        />
      ) : (
        <Assessment
          slug={slug}
          quizName={quizName}
          questions={questions}
          loading={loading}
          user={user}
          setLoading={setLoading}
          setShowResult={setShowResult}
          seletedOptions={seletedOptions}
          setSeletedOptions={setSeletedOptions}
          setCorrectAnswersCount={setCorrectAnswersCount}
          setInCorrectAnswersCount={setInCorrectAnswersCount}
        />
      )}
    </Container>
  );
};

export default Attempt;
