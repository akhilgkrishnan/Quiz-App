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
end
