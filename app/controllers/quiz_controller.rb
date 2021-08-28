# frozen_string_literal: true

class QuizController < ApplicationController
  def index
    quizzes = current_user.quizzes
    render status: :ok, json: { quizzes: quizzes }
  end
end
