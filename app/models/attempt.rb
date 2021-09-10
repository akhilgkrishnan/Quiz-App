# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers, dependent: :destroy

  accepts_nested_attributes_for :attempt_answers, allow_destroy: true

  def self.to_csv
    ReportGeneratorJob.perform_now(
      all.as_json(
        include: {
          quiz: {
            only: [:title, :id]
          },
          user: {
            only: [:first_name, :last_name, :email]
          }
        }))
  end
end
