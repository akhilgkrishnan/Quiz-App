# frozen_string_literal: true

class CreateAttempts < ActiveRecord::Migration[6.1]
  def change
    create_table :attempts do |t|
      t.references :quiz, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.boolean :submitted, default: false
      t.integer :correct_answers, default: 0, null: false
      t.integer :incorrect_answers, default: 0, null: false

      t.timestamps
    end
  end
end
