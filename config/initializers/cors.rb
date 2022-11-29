Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    #change this as per the react app's local server port
    origins "http://localhost:3001"
    # origins "*"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end

  allow do
    #change this as per the heroku app domain
    origins "https://finadvice.herokupp.com"
    resource "*", headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head], credentials: true
  end
end