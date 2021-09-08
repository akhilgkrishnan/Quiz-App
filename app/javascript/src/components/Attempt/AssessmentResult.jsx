import React from "react";

const AssessmentResult = ({
  quizName,
  questions,
  seletedOptions,
  correctAnswersCount,
  inCorrectAnswersCount
}) => {
  return (
    <>
      <h1 className="mt-3 text-2xl font-bold text-gray-500 capitalize">
        {quizName}
      </h1>
      <h1 className="mt-1">
        Thank you for taking the quiz, here are your results. You
        <br /> have submitted {correctAnswersCount} correct and{" "}
        {inCorrectAnswersCount} incorrect answers{" "}
      </h1>
      <form className="flex flex-col my-2">
        {questions.map((question, index) => (
          <div className="flex flex-row gap-24 my-6" key={index}>
            <div className="text-gray-700">Question {index + 1}</div>
            <div className="flex flex-col">
              <p className="text-back-500 font-medium">{question.title}</p>
              {question.options.map((option, idx) => (
                <label className="inline-flex items-center mt-3" key={idx}>
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-600"
                    name={question.title}
                    value={option.id}
                    checked={option.id == seletedOptions[index].option_id}
                    disabled
                  />
                  <span className="ml-2 text-black-700 flex flex-row">
                    {option.value}
                    {option.value == question.answer && (
                      <span className="text-green-500 relative flex justify-center">
                        <i className="ri-checkbox-circle-fill px-3"></i> Correct
                        answer
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </form>
    </>
  );
};

export default AssessmentResult;
