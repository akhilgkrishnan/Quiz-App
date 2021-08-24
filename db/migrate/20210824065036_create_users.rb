class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name, null: false, limit: 50
      t.string :last_name, null: false, limit: 50
      t.string :email
      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
