# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz

  validates :title, presence: true
end
