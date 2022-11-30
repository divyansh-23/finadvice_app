class Course < ApplicationRecord
  belongs_to :user
  # validates_presence_of :name, :course_enroll_limit#, :start_date
end
