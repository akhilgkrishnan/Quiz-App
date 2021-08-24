# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  enum role: { standard: 0, administrator: 1 }, _default: :standard

  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :email, presence: true,
                    uniqueness: true,
                    length: { maximum: 50 },
                    format: { with: VALID_EMAIL_REGEX }
  validates :role, presence: true, inclusion: { in: roles.keys, message: "Invalid Role" }
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
