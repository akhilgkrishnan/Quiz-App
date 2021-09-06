import React from "react";

import Button from "components/Button";

const ListQuestions = ({ questions }) => {
  return (
    <>
      {questions.map((question, key) => (
        <div className="md:flex md:items-center mt-6 max-w-3xl" key={key}>
          <div className="md:w-2/12 block text-gray-500 text-sm font-medium md:text-left mb-1 md:mb-0 pr-4">
            <div className="flex flex-col">
              <p className="mb-1">Question {key + 1}</p>
              <p>Option 1</p>
              <p>Option 2</p>
              <p>Option 3</p>
              <p>Option 4</p>
            </div>
          </div>
          <div className="md:w-6/12">
            <div className="flex flex-col text-black-300">
              <p className="font-bold">{question.title}</p>
              {question.options.map((option, key) => (
                <p className="flex flex-row" key={key}>
                  {option.value}
                  {option.value == question.answer && (
                    <span className="text-green-500 relative flex justify-center">
                      <i className="ri-checkbox-circle-fill px-1"></i> Correct
                      answer
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
          <div className="md:w-3/12">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="submit"
                iconclassName="ri-pencil-line mr-2"
                buttonText="Edit"
              />
              <Button
                iconclassName="ri-delete-bin-line mr-2"
                buttonText="Delete"
                styleClass="bg-bb-red hover:bg-red-400 focus:shadow-outline focus:outline-none"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListQuestions;
