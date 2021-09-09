# frozen_string_literal: true

class AttemptController < ApplicationController
  skip_before_action :set_current_user
  before_action :load_quiz

  def validate_quiz
    redirect_to "/public/#{@quiz.slug}/attempt/new"
  end

  def show_quiz
    render status: :ok, json: {
      quiz: @quiz,
      questions: @quiz.questions.as_json(
        include: {
          options: {
            only: [:value, :id]
          }
        })
    }
  end

  def login
    if user
      attempted = @quiz.attempts.find_by(user_id: user.id)&.submitted
      render status: :ok, json: {
        user: user, attempted: attempted
      }
    else
      user = User.new(
        user_params.merge(
          { password: "welcome", password_confirmation: "welcome", role: "standard" }))
      if user.save
        render status: :ok, json: {
          user: user
        }
      end
    end
  end

  def create
    attempt = @quiz.attempts.new(attempt_params)
    if attempt.save
      render status: :ok, json: { notice: "You have successfully completed the quiz" }
    else
      errors = attempt.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by!(slug: "#{params[:slug]}")
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end

    def user
      @_user ||= User.find_by(email: user_params[:email].downcase)
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email)
    end

    def attempt_params
      params.require(:assessment).permit(
        :user_id, :correct_answers, :incorrect_answers, :submitted,
        attempt_answers_attributes: [:id, :question_id, :option_id])
    end
end
