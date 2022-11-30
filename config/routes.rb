Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :sessions, only: [:create]
  resources :registrations, only: [:create, :index, :update]
  get "/instructor_courses,", to: "courses#:instructor_courses"
  resources :courses, only: [:create]
  resources :enrollments, only: [:create, :delete]
  get "/student_courses", to: "enrollments#student_courses"
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  root to: "static#home"
  # Defines the root path route ("/")
  # root "articles#index"
end
