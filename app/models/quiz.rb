# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions

  validates :title, presence: true
  validates :slug, uniqueness: true, on: :update

  def set_slug
    itr = 1
    loop do
      title_slug = "public/#{title.parameterize}"
      slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
      break self.update(slug: slug_candidate) unless Quiz.exists?(slug: slug_candidate)

      itr += 1
    end
  end
end
