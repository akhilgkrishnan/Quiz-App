import React, { useState } from "react";

import Button from "components/Button";
import attemptApi from "apis/attempt";

const Assesment = ({
  slug,
  quizName,
  user,
  questions,
  loading,
  setLoading
}) => {
  const [options, setOptions] = useState([]);

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      let correctAnswers = 0;
      questions.map((question, index) => {
        question.options.map(option => {
          if (
            option.value == question.correct_answer &&
            option.id == options[index].option_id
          )
            correctAnswers += 1;
        });
      });
      const incorrectAnswers = questions.length - correctAnswers;
      await attemptApi.create(slug, {
        assessment: {
          user_id: user.id,
          attempt_answers_attributes: options,
          correct_answers: correctAnswers,
          incorrect_answers: incorrectAnswers,
          submitted: true
        }
      });
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const handleOption = (questionId, answerId) => {
    setOptions(prevState => {
      const object = { question_id: questionId, option_id: answerId };
      const index = prevState.findIndex(
        element => element.question_id == questionId
      );
      if (index >= 0) {
        prevState[index] = object;
      } else return [...prevState, object];
    });
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-gray-500 capitalize">
        {quizName}
      </h1>

      <form className="flex flex-col my-2" onSubmit={handleSubmit}>
        {questions.map((question, idx) => (
          <div className="flex flex-row gap-24 my-6" key={idx}>
            <div className="text-gray-700">Question {idx + 1}</div>
            <div className="flex flex-col">
              <p className="text-back-500 font-medium">{question.title}</p>
              {question.options.map((option, idx) => (
                <label className="inline-flex items-center mt-3" key={idx}>
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-gray-600"
                    name={question.title}
                    onChange={() => handleOption(question.id, option.id)}
                    required
                  />
                  <span className="ml-2 text-black-700">{option.value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-left ml-40">
          <div className="md:w-1/7">
            <div className="mt-6">
              <Button type="submit" buttonText="Submit" loading={loading} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Assesment;
