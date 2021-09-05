# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz
  def create
    question = @quiz.questions.new(question_params)
    if question.save
      render status: :ok, json: { notice: "Question Sucessfully Created" }
    else
      render status: :unprocessable_entity, json: { errors: question.errors.full_messages }
    end
  end

  private

    def question_params
      params.require(:question).permit(:title, :answer, options_attributes: [:id, :value])
    end

    def load_quiz
      @quiz = Quiz.find(params[:quiz_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
    end
end
