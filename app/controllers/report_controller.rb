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
    report_id = SecureRandom.hex(3)
    report.generate_report(report_id: report_id)
    while true
      if File.exist?("#{Rails.root}/public/reports/report_#{report_id}.csv")
        break
      end
    end

    render json: {
      notice: "Report Generation Completed",
      report_path: "/reports/report_#{report_id}.csv"
    }, status: :ok
  end

  private

    def report
      @_report ||= Attempt.where(submitted: true).order("created_at desc")
    end
end
