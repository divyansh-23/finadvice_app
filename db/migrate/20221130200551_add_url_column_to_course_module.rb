class AddUrlColumnToCourseModule < ActiveRecord::Migration[7.0]
  def change
    add_column :course_modules, :media_url, :text
  end
end
