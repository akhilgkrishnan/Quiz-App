# frozen_string_literal: true

class HomeController < ApplicationController
  skip_before_action :set_current_user

  def index
    render
  end
end
