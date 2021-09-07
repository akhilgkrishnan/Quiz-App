# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy

  accepts_nested_attributes_for :options, allow_destroy: true

  validates :options, length: {
    minimum: 2, too_short: "Should have atleast two options",
    maximum: 4, too_long: "Should have atmost 5 options"
  }

  validates :title, presence: true
  validates :answer, presence: true
end
