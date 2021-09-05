# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com", role: 1,
      password: "welcome",
      password_confirmation: "welcome")
    @quiz = @user.quizzes.new(title: "World Quiz")
    @question = @quiz.questions.new(title: "Which is the biggest country?", answer: "Russia")
  end

  def test_question_invalid_without_title
    @question.title = ""
    assert @question.invalid?
    assert_equal ["Title can't be blank"], @question.errors.full_messages
  end

  def test_question_invalid_without_answer
    @question.answer = ""
    assert @question.invalid?
    assert_equal ["Answer can't be blank"], @question.errors.full_messages
  end
end
