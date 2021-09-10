# frozen_string_literal: true

require "csv"
class ReportGeneratorJob < ApplicationJob
  queue_as :default

  def perform(reports)
    head = ["quiz_name", "user_name", "email", "correct_answers", "incorrect_answers"]
    CSV.generate(headers: true) do |csv|
      csv << head
      reports.each do |report|
        csv << [
          report["quiz"]["title"], "#{report["user"]["first_name"]} #{report["user"]["last_name"]}",
          report["user"]["email"], report["correct_answers"], report["incorrect_answers"]]
      end
    end
  end
end
