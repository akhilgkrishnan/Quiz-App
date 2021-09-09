# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
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

  def test_attempt_answer_should_destroy_when_attempt_deleted
    @quiz.set_slug
    user = User.create(
      first_name: "Eve",
      last_name: "Smith",
      email: "eve@example.com", role: 0,
      password: "welcome",
      password_confirmation: "welcome")
    attempt = user.attempts.create(
      {
        attempt_answers_attributes: [{ option_id: 1, question_id: @question.id }],
        submitted: true, correct_answers: 1, incorrect_answers: 0, quiz_id: @quiz.id
      })
    attempt.destroy
    assert_equal AttemptAnswer.count, 0
  end
end
