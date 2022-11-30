class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.string :subject
      t.string :category
      t.text :description
      t.date :start_date
      t.integer :course_enroll_limit
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
