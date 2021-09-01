import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const LoginForm = ({ handleSubmit, setEmail, setPassword, loading }) => {
  return (
    <div
      className="flex items-top justify-center
      px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold leading-9 text-bb-gray-700">
          <div className="flex justify-center mr-10">Login</div>
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
          />
          <div className="flex justify-left">
            <div className="md:w-1/3"></div>
            <div className="md:w-1/4">
              <div className="mt-6">
                <Button type="submit" buttonText="Sign In" loading={loading} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
