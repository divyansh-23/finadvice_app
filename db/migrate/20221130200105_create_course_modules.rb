class CreateCourseModules < ActiveRecord::Migration[7.0]
  def change
    create_table :course_modules do |t|
      t.string :name
      t.integer :position
      t.text :description
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
