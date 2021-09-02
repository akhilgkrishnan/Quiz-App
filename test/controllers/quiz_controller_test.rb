# frozen_string_literal: true

require "test_helper"

class QuizControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com", role: 1,
      password: "welcome",
      password_confirmation: "welcome")
    sign_in_as(@user, "welcome")
    @quiz = @user.quizzes.create(title: "World Quiz")
  end

  def test_list_all_quiz_in_the_database_created_by_user
    @user.quizzes.create(title: "Indian Independence Quiz")
    get "/quiz"
    assert_response :success
    response_body = response.parsed_body
    assert_equal @user.quizzes.count, response_body["quizzes"].length
  end

  def test_create_quiz_with_blank_title_is_invalid
    post "/quiz", params: { quiz: { title: "" } }
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal ["Title can't be blank"], response_json["errors"]
  end

  def test_create_quiz
    post "/quiz", params: { quiz: { title: "Indian Independence Quiz" } }
    assert_response :success
    assert_equal Quiz.count, 2
  end

  def test_update_quiz
    put "/quiz/#{@quiz.id}", params: { quiz: { title: "Indian Independence Quiz" } }
    assert_response :success
    assert_equal "Indian Independence Quiz", Quiz.find(@quiz.id).title
  end

  def test_update_quiz_with_invalid_id
    put "/quiz/12", params: { quiz: { title: "Indian Independence Quiz" } }
    assert_response :not_found
  end
end
