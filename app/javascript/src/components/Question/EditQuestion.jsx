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
  const [defaultValue, setDefaultValue] = useState(0);
  const { quiz_id, id } = useParams();

  const fetchQuestionDetails = async () => {
    try {
      const response = await questionApi.show(quiz_id, id);
      const title = response.data.question.title;
      const options = response.data.question.options;
      const answer = response.data.question.title;
      setQuestion(title);
      setOptions(() => {
        options.map((obj, idx) => {
          if (idx >= 2) obj["removableOption"] = true;
        });
        return options;
      });
      setCorrectAnswer(answer);
      setDefaultValue(() => {
        let indexOfCorrectAnswer;
        options.map((obj, idx) => {
          if (obj.option == answer) indexOfCorrectAnswer = idx;
        });
        return indexOfCorrectAnswer;
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);
      let optionsAttributes = options.map(option => ({
        value: option.value,
        id: option?.id
      }));
      await questionApi.update(quiz_id, id, {
        question: {
          title: question,
          answer: correctAnswer,
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

  if (loading) {
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
      />
    </Container>
  );
};

export default EditQuestion;
