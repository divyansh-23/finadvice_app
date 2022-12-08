class EnrollmentsController < ApplicationController
  include CurrentUserConcern

  def create
      enrollment = Enrollment.create!(
        enrolled_at: Date.today,
        student_progress_module_id: 1,
        user_id: params['enrollment']['user_id'],
        course_id: params['enrollment']['course_id'],
    )
  
    if enrollment
      render json: {
        status: :enrollment_created,
        enrollment: enrollment 
      }
    else
      render json: { status: enrollment_not_created }
    end
  end

  def student_courses
    course_ids = Enrollment.where(user_id: params["user_id"]).pluck(:course_id).uniq
    courses = Course.where(id: course_ids)
    render json: {
      status: :complete,
      courses: courses
    }
  end
end