# frozen_string_literal: true

class ReportController < ApplicationController
  def index
    render status: :ok, json: {
      reports: report.as_json(
        include: {
          quiz: {
            only: [:title, :id]
          },
          user: {
            only: [:first_name, :last_name, :email]
          }
        })
    }
  end

  private

    def report
      @_report ||= Attempt.all
    end
end
