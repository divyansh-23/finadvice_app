class CourseModulesController < ApplicationController
  include CurrentUserConcern

  def create
    course_module = CourseModule.create!(
      name: params['module']['name'],
      position: params['module']['position'],
      description: params['module']['description'],
      media_url: params['module']['media_url'],
      course_id: params['module']['course_id'],
    )
  
    if course_module
      render json: {
        status: :module_created,
        course: course_module
      }
    else
      render json: { status: module_not_created }
    end
  end

  def course_module_list
    CourseModule.where(course_id: 7).order(:position)
    course_modules = CourseModule.where(course_id: params["course_id"]).order(:position)
    render json: {
      status: :complete,
      course_modules: course_modules
    }
  end

end