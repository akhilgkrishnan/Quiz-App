# frozen_string_literal: true

class QuizController < ApplicationController
  def index
    quizzes = current_user.quizzes
    render status: :ok, json: { quizzes: quizzes }
  end

  def create
    quiz = current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: "Quiz Sucessfully Created" }
    else
      render status: :unprocessable_entity, json: { errors: quiz.errors.full_messages }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end
end
