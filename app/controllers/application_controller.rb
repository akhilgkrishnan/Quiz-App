# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_current_user

  def set_current_user
    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
    else
      render json: {
        notice: "Invalid User"
      }, status: :unauthorized
    end
  end
end
