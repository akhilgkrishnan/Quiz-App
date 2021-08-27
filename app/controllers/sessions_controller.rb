# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    user = User.find_by(email: login_params[:email].downcase)
    if user.present? && user.authenticate(login_params[:password])
      byebug
      session[:user_id] = user.id
      render status: :ok, json: {
        loggedIn: true, userId: user.id,
        userName: "#{user.first_name} #{user.last_name}",
        userEmail: user.email
      }
    else
      render status: :unauthorized, json: {
        notice: "Incorrect credentials, try again."
      }
    end
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
