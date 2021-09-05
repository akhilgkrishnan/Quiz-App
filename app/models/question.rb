# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy, foreign_key: :question_id

  validates :title, presence: true
end
