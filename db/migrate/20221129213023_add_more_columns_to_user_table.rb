class AddMoreColumnsToUserTable < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :phone, :string
    add_column :users, :name, :string
  end
end
