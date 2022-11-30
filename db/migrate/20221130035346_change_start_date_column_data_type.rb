class ChangeStartDateColumnDataType < ActiveRecord::Migration[7.0]
  def change
    change_column :courses, :start_date, :string
  end
end
