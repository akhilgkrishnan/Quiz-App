import React, { useState } from "react";

import attemptApi from "apis/attempt";
import LoginForm from "components/Attempt/Form/LoginForm";

const AttemptLogin = ({
  slug,
  quizName,
  loading,
  setUser,
  setShowAssesment,
  setLoading,
  setUserAttempted
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleNext = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await attemptApi.login(slug, {
        user: { first_name: firstName, last_name: lastName, email }
      });
      setUser(response.data.user);
      setUserAttempted(response.data.attempted);
      setShowAssesment(true);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-gray-500 capitalize">
        Welcome to {quizName}
      </h1>
      <LoginForm
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleNext}
      />
    </div>
  );
};

export default AttemptLogin;
