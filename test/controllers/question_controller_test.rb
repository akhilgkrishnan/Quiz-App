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
    @question = @quiz.questions.create(title: "Largest City", answer: "New York")
  end

  def test_create_question_with_blank_title_and_answer_is_invalid
    post "/quiz/#{@quiz.id}/questions", params: { question: { title: "" } }
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal ["Title can't be blank", "Answer can't be blank"], response_json["errors"]
  end

  def test_create_question
    post "/quiz/#{@quiz.id}/questions",
      params: { question: { title: "Which is the largest country?", answer: "Russia" } }
    assert_response :success
    assert_equal @quiz.questions.count, 2
  end
end
