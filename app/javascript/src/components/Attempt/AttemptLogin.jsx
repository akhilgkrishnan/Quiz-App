import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import attemptApi from "apis/attempt";
import LoginForm from "components/Attempt/Form/LoginForm";

const AttemptLogin = ({ history }) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await attemptApi.login(slug, {
        user: { first_name: firstName, last_name: lastName, email }
      });
      setUser(response.data.user);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await attemptApi.show(slug);
      setQuizName(response.data.quiz.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <div className="mt-6">
        <h1 className="text-2xl font-bold text-gray-500 capitalize">
          Welcome to {quizName}
        </h1>
        <LoginForm
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
};

export default AttemptLogin;
