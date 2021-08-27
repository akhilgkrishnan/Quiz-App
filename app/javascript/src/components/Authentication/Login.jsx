import React, { useState } from "react";

import LoginForm from "components/Authentication/Form/LoginForm";
import authApi from "apis/auth";
import { setToLocalStorage } from "src/helpers/storage";
import Container from "components/Container";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        isLoggedIn: response.data.loggedIn,
        email,
        userId: response.data.userId,
        userName: response.data.userName
      });
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Login;
