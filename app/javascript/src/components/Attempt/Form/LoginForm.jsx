import React from "react";

import Input from "components/Input";
import Button from "components/Button";

const LoginForm = ({
  setFirstName,
  setLastName,
  setEmail,
  loading,
  handleSubmit
}) => {
  return (
    <div
      className="flex items-center
    px-4 py-10 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        <form className="mt-8" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            type="text"
            placeholder="Eve"
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Smith"
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="eve@example.com"
            onChange={e => setEmail(e.target.value)}
          />
          <div className="flex justify-left">
            <div className="md:w-1/3"></div>
            <div className="md:w-1/4">
              <div className="mt-6">
                <Button type="submit" buttonText="Next" loading={loading} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
