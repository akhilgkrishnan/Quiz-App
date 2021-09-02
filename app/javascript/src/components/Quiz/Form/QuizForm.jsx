import React from "react";
import Input from "components/Input";
import Button from "components/Button";

import PropTypes from "prop-types";

const QuizForm = ({ title, setTitle, loading, handleSubmit }) => {
  return (
    <div className="max-w mx-auto mt-10">
      <h1 className="text-2xl font-medium">Add New Quiz</h1>
      <form className="max-w-lg mt-12" onSubmit={handleSubmit}>
        <Input
          label="Quiz Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex justify-left">
          <div className="md:w-1/3"></div>
          <div className="md:w-1/4">
            <div className="mt-6">
              <Button type="submit" buttonText="Submit" loading={loading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

QuizForm.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func
};

export default QuizForm;
