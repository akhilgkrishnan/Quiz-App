# frozen_string_literal: true

require "csv"
class ReportGeneratorJob < ApplicationJob
  queue_as :default

  def perform(report_id, reports)
    sleep 10
    file = "#{Rails.root}/public/reports/report_#{report_id}.csv"
    head = ["quiz_name", "user_name", "email", "correct_answers", "incorrect_answers"]
    CSV.open(file, "w", write_headers: true, headers: head) do |csv|
      reports.each do |report|
        csv << [
          report["quiz"]["title"], "#{report["user"]["first_name"]} #{report["user"]["last_name"]}",
          report["user"]["email"], report["correct_answers"], report["incorrect_answers"]]
      end
    end
  end
end
