# frozen_string_literal: true

require "test_helper"

class AttemptControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com", role: 1,
      password: "welcome",
      password_confirmation: "welcome")
    @quiz = @user.quizzes.create(title: "World Quiz")
    @question = @quiz.questions.create(
      title: "Largest City", answer: "New York",
      options_attributes: [
        { value: "New York" },
        { value: "India" }
        ]
      )
  end

  def test_new_standard_user_login
    @quiz.set_slug
    post "/attempt/#{@quiz.reload.slug}/login", params: {
      user: { first_name: "Eve", last_name: "Smith", email: "eve@example.com" }
    }
    assert_response :success
    assert_equal User.count, 2
  end

  def test_standard_user_attempting_already_attempted_quiz
    @quiz.set_slug
    user = User.create(
      first_name: "Eve",
      last_name: "Smith",
      email: "eve@example.com", role: 0,
      password: "welcome",
      password_confirmation: "welcome")
    @quiz.attempts.create(user_id: user.id, submitted: true)
    post "/attempt/#{@quiz.reload.slug}/login", params: {
      user: { first_name: "Eve", last_name: "Smith", email: "eve@example.com" }
    }
    assert_response :success
    response_json = response.parsed_body
    assert_equal true, response_json["attempted"]
  end

  def test_show_quiz
    @quiz.set_slug
    get "/attempt/#{@quiz.reload.slug}/show-quiz"
    assert_response :success
    response_json = response.parsed_body
    assert_equal @quiz.title, response_json["quiz"]["title"]
  end

  def test_show_quiz_with_invalid_slug
    @quiz.set_slug
    get "/attempt/#{@quiz.reload.slug}-5/show-quiz"
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal "Couldn't find Quiz", response_json["errors"]
  end

  def test_attempt_create
    @quiz.set_slug
    user = User.create(
      first_name: "Eve",
      last_name: "Smith",
      email: "eve@example.com", role: 0,
      password: "welcome",
      password_confirmation: "welcome")
    post "/attempt/#{@quiz.reload.slug}", params: {
      assessment: {
        user_id: user.id, attempt_answers_attributes: [{ option_id: 1, question_id: 1 }],
        submitted: true, correct_answers: 1, incorrect_answers: 0
      }
    }
    assert_response :success
  end
end
