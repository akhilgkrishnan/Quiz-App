# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :load_quiz
  before_action :load_question, only: %i[show update destroy]
  def create
    question = @quiz.questions.new(question_params)
    if question.save
      render status: :ok, json: { notice: "Question Sucessfully Created" }
    else
      render status: :unprocessable_entity, json: { errors: question.errors.full_messages }
    end
  end

  def show
    render status: :ok, json: {
      question: @question.as_json(
        include: {
          options: {
            only: [:value, :id]
          }
        })
    }
  end

  def update
    if @question.update(question_params)
      render status: :ok, json: { notice: "Question Sucessfully Updated" }
    else
      render status: :unprocessable_entity, json: { errors: question.errors.full_messages }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: "Question Sucessfully Deleted" }
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

    def load_question
      @question = @quiz.questions.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
    end
end
