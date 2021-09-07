# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com", role: 1,
      password: "welcome",
      password_confirmation: "welcome")
    @quiz = @user.quizzes.create(title: "World Quiz")
    @question = @quiz.questions.create(title: "Which is the biggest country?", answer: "Russia")
    @option = @question.options.new(value: "Russia")
  end

  def test_question_invalid_without_value
    @option.value = ""
    assert @option.invalid?
    assert_equal ["Value can't be blank"], @option.errors.full_messages
  end
end
