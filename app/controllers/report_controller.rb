# frozen_string_literal: true

class ReportController < ApplicationController
  skip_before_action :set_current_user
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

  def generate_report
    respond_to do |format|
      format.html
      format.csv { send_data report.to_csv, filename: "report-#{Time.zone.today}.csv" }
    end
  end

  private

    def report
      @_report ||= Attempt.where(submitted: true).order("created_at desc")
    end
end
