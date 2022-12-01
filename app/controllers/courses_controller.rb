class CoursesController < ApplicationController
  include CurrentUserConcern

  def create
    course = Course.create!(
      name: params['course']['name'],
      subject: params['course']['subject'],
      category: params['course']['category'],
      description: params['course']['description'],
      start_date: params['course']['start_date'],
      course_enroll_limit: params['course']['course_enroll_limit'],
      user_id: params['course']['user_id'],
    )
  
    if course
      render json: {
        status: :course_created,
        course: course
      }
    else
      render json: { status: course_not_created }
    end
  end


  #to be done
  def update
# user = User
#              .find_by(email: params["user"]["email"])
#              .try(:authenticate, params["user"]["password"])

#     if user
#       session[:user_id] = user.id
#       render json: {
#         status: :created,
#         logged_in: true,
#         user: user
#       }
#     else
#       render json: { status: 401, logged_in: false }
#     end        


#       course = Course.create!(
#       name: params['course']['name'],
#       subject: params['course']['subject'],
#       category: params['course']['category'],
#       description: params['course']['description'],
#       start_date: params['course']['start_date'],
#       course_enroll_limit: params['course']['course_enroll_limit'],
#       user_id: params['course']['user_id'],
#     )
  
#     if course
#       render json: {
#         status: :course_created,
#         course: course
#       }
#     else
#       render json: { status: course_not_created }
#     end
  end

  def index
    courses = Course.all
    render json: {
      status: :complete,
      courses: courses
    }
  end

  def instructor_courses
    courses = Course.where(user_id: params["id"])
    render json: {
      status: :complete,
      courses: courses
    }
  end
end
