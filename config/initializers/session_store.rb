#correct_domain_when_domain_name_exist
if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_finadvice_app", domain: :all
else
  Rails.application.config.session_store :cookie_store, key: "_finadvice_app"
end

