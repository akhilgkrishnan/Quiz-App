# frozen_string_literal: true

class QuizController < ApplicationController
  before_action :load_quiz, only: %i[update show destroy]

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

  def show
    render status: :ok, json: {
      quiz: @quiz,
      questions: @quiz.questions.as_json(
        include: {
          options: {
            only: [:id, :value]
          }
        })
    }
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Quiz Sucessfully Updated" }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Quiz Sucessfully Deleted" }
    else
      errors = @quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end

    def load_quiz
      @quiz = Quiz.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end
end
