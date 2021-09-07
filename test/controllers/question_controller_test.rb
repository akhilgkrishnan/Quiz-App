# frozen_string_literal: true

require "test_helper"

class QuestionControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com", role: 1,
      password: "welcome",
      password_confirmation: "welcome")
    sign_in_as(@user, "welcome")
    @quiz = @user.quizzes.create(title: "World Quiz")
    @question = @quiz.questions.create(
      title: "Largest City", answer: "New York",
      options_attributes: [
        { value: "New York" },
        { value: "India" }
        ]
      )
  end

  def test_create_question_with_blank_title_and_answer_is_invalid
    post "/quiz/#{@quiz.id}/questions", params: {
      question: { title: "", options_attributes: [{ value: "Russia" }, { value: "India" }] }
    }
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal ["Title can't be blank", "Answer can't be blank"], response_json["errors"]
  end

  def test_create_question
    post "/quiz/#{@quiz.id}/questions",
      params: {
        question: {
          title: "Which is the largest country?", answer: "Russia",
          options_attributes: [{ value: "Russia" }, { value: "India" }]
        }

      }
    assert_response :success
    assert_equal @quiz.questions.count, 2
  end

  def test_update_question_title
    put "/quiz/#{@quiz.id}/questions/#{@question.id}",
      params: {
        question: {
          title: "Which country capital is moscow?", answer: "Russia",
          options_attributes: [
            { value: "Russia" }, { value: "India" }
            ]
        }
      }
    assert_response :success
    assert_not_equal @question.title, Question.find(@question.id).title
  end

  def test_delete_question
    delete "/quiz/#{@quiz.id}/questions/#{@question.id}"
    assert_response :success
    assert_equal @quiz.questions.count, 0
  end

  def test_question_with_options_count_less_than_2
    post "/quiz/#{@quiz.id}/questions",
      params: {
        question: {
          title: "Which is the largest country?",
          answer: "Russia",
          options_attributes: [
            { value: "Russia" }
          ]
        }
      }
    assert_response :unprocessable_entity
    assert_equal ["Options Should have atleast two options"], response.parsed_body["errors"]
  end

  def test_question_with_options_count_more_than_4
    post "/quiz/#{@quiz.id}/questions",
      params: {
        question: {
          title: "Which is the largest country?",
          answer: "Russia",
          options_attributes: [
            { value: "Russia" },
            { value: "China" },
            { value: "America" },
            { value: "India" },
            { value: "England" },
            { value: "England" }
          ]
        }
      }
    assert_response :unprocessable_entity
    assert_equal ["Options Should have atmost 5 options"], response.parsed_body["errors"]
  end
end
