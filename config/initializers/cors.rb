Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    #change this as per the react app's local server port
    origins "http://localhost:3001"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end

  allow do
    #change this as per the heroku app domain
    origins "https://silly-frangipane-f9d81d.netlify.app"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end