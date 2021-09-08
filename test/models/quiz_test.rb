# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com", role: 1,
      password: "welcome",
      password_confirmation: "welcome")
    @quiz = @user.quizzes.new(title: "World Quiz")
    Quiz.delete_all
  end

  def test_quiz_invalid_without_title
    @quiz.title = ""
    assert @quiz.invalid?
    assert_equal ["Title can't be blank"], @quiz.errors.full_messages
  end

  def test_set_slug_method
    @quiz.set_slug
    assert_equal "world-quiz", @quiz.slug
  end
end
