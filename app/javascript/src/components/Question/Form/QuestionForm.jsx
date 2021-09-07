import React, { useEffect, useState } from "react";
import Select from "react-select";

import Input from "components/Input";
import Button from "components/Button";

const QuestionForm = ({
  question,
  setQuestion,
  options,
  defaultValue = 0,
  setOptions,
  handleSubmit,
  setCorrectAnswer,
  loading
}) => {
  const MAX_OPTIONS_COUNT = 4;

  const selectCorrectAnswer = [];
  options.forEach((option, index) =>
    selectCorrectAnswer.push({
      value: index,
      label: `Option ${index + 1}`
    })
  );

  const defaultOption = {
    value: defaultValue,
    label: `Option ${defaultValue + 1}`
  };

  const handleSetOptions = (value, idx) => {
    setOptions(prevState => {
      const curState = [...prevState];
      curState[idx].value = value;
      setCorrectAnswer(curState[0].value);
      return curState;
    });
  };

  return (
    <form className="max-w-lg mt-12" onSubmit={handleSubmit}>
      <Input
        label="Question"
        type="text"
        placeholder="Eg: Who is the father of computer?"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      {options.map((option, index) => (
        <Input
          key={index}
          label={`Option ${index + 1}`}
          value={option.value}
          removableOption={option.removableOption}
          removableAction={() => {
            setOptions(prevState => prevState.filter((_, i) => i !== index));
          }}
          onChange={e => handleSetOptions(e.target.value, index)}
        />
      ))}

      {options.length < MAX_OPTIONS_COUNT && (
        <div className="md:flex md:items-center mt-6">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <p
              className="text-blue-500 underline cursor-pointer"
              onClick={() =>
                setOptions(prevState => [
                  ...prevState,
                  { value: "", removableOption: true }
                ])
              }
            >
              <i className={`ri-add-line`}></i>&nbsp;Add Option
            </p>
          </div>
        </div>
      )}
      <div className="md:flex md:items-center mt-6">
        <div className="md:w-1/3">
          <label
            className="block text-md font-medium
                leading-5 text-gray-600 md:text-left pr-5"
          >
            Correct Answer :
          </label>
        </div>
        <div className="md:w-1/3 mb-1 rounded-md shadow-sm">
          <Select
            options={selectCorrectAnswer}
            defaultValue={defaultOption}
            onChange={e => setCorrectAnswer(options[e.value].value)}
            isSearchable
          />
        </div>
        <div className="md:w-1/3"></div>
      </div>
      <div className="flex justify-left">
        <div className="md:w-1/3"></div>
        <div className="md:w-1/4">
          <div className="mt-6">
            <Button type="submit" buttonText="Submit" loading={loading} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
