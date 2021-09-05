import React, { useState } from "react";
import { useParams } from "react-router";

import Container from "components/Container";
import QuestionForm from "components/Question/Form/QuestionForm";
import PageLoader from "components/PageLoader";
import questionApi from "apis/question";

const CreateQuestion = ({ history }) => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState([
    { value: "", removableOption: false },
    { value: "", removableOption: false }
  ]);
  const [loading, setLoading] = useState(false);
  const { quiz_id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      let optionsAttributes = options.map(option => ({ value: option.value }));
      await questionApi.create(quiz_id, {
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
        setQuestion={setQuestion}
        options={options}
        setOptions={setOptions}
        handleSubmit={handleSubmit}
        setCorrectAnswer={setCorrectAnswer}
      />
    </Container>
  );
};

export default CreateQuestion;
