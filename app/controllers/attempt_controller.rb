# frozen_string_literal: true

class AttemptController < ApplicationController
  skip_before_action :set_current_user
  before_action :load_quiz, only: %i[validate_quiz show_quiz login]

  def validate_quiz
    redirect_to "/public/#{@quiz.slug}/attempt/new"
  end

  def show_quiz
    render status: :ok, json: { quiz: @quiz }
  end

  def login
    if user
      render status: :ok, json: {
        user: user
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
end
