import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuestionForm from "components/Question/Form/QuestionForm";
import PageLoader from "components/PageLoader";
import questionApi from "apis/question";

const EditQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [defaultValue, setDefaultValue] = useState(0);
  const { quiz_id, id } = useParams();

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionApi.show(quiz_id, id);
      const title = response.data.question.title;
      const optionValues = response.data.question.options;
      const answer = response.data.question.answer;
      setQuestion(title);
      setOptions(() => {
        optionValues.map((obj, idx) => {
          if (idx >= 2) obj["removableOption"] = true;
        });
        return optionValues;
      });
      setCorrectAnswer(answer);
      setDefaultValue(() => {
        let indexOfCorrectAnswer;
        optionValues.map((obj, idx) => {
          if (obj.value == answer) indexOfCorrectAnswer = idx;
        });
        return indexOfCorrectAnswer;
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);

      const response = await questionApi.show(quiz_id, id);
      const optionValues = response.data.question.options;
      let optionsAttributes = [];

      optionValues.map((obj, idx) => {
        if (options[idx] && options[idx].id == obj.id)
          optionsAttributes.push({ id: obj.id, value: options[idx].value });
        else optionsAttributes.push({ ...obj, _destroy: obj.id });
      });

      if (optionValues.length < options.length)
        optionsAttributes.push(...options.slice(optionValues.length));
      const isPresent = optionsAttributes.findIndex(
        element => element.value == correctAnswer && !element._destroy
      );

      if (isPresent == -1) {
        setCorrectAnswer(optionsAttributes[0].value);
      }

      await questionApi.update(quiz_id, id, {
        question: {
          title: question,
          answer: isPresent != -1 ? correctAnswer : optionsAttributes[0].value,
          options_attributes: optionsAttributes
        }
      });
      setLoading(false);
      history.push(`/quiz/${quiz_id}/show`);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <QuestionForm
        question={question}
        setQuestion={setQuestion}
        options={options}
        setOptions={setOptions}
        defaultValue={defaultValue}
        setCorrectAnswer={setCorrectAnswer}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default EditQuestion;
