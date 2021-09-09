# frozen_string_literal: true

require "test_helper"

class ReportControllerTest < ActionDispatch::IntegrationTest
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
    sign_in_as(@user, "welcome")
  end

  def test_report_listing
    @quiz.set_slug
    user = User.create(
      first_name: "Eve",
      last_name: "Smith",
      email: "eve@example.com", role: 0,
      password: "welcome",
      password_confirmation: "welcome")
    user.attempts.create(
      {
        attempt_answers_attributes: [{ option_id: 1, question_id: @question.id }],
        submitted: true, correct_answers: 1, incorrect_answers: 0, quiz_id: @quiz.id
      })

    get "/report"
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["reports"].length, Attempt.count
  end
end
