class Course < ApplicationRecord
  belongs_to :user
  
  has_many :courses
  has_many :course_modules
  validates_presence_of :name, :course_enroll_limit, :start_date
end
