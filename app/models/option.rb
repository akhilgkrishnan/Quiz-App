# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question, validate: true

  validates :value, presence: true
end
