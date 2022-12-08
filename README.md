Backend Installation Guide:

Install Postgresql on your local machine:
Use the link here and choose the download option for the Operating system you have. 
https://www.postgresql.org/download/
Install RVM on your local machine:
https://rvm.io/rvm/install

Install Ruby 2.7.1 using RVM
Command: rvm install 2.1.1
Clone the project repo through this link: https://github.com/divyansh-23/finadvice_app.git
Get inside the directory where you cloned the project.
Get inside the project’s folder with name “finadvice_app” using “cd” command
Run – “bundle install” inside the app directory using terminal
Run – “rails:db create”
Run – “rails:db migrate”
Run – “rails server” (to run the application on the local server)

  
Frontend Installation Guide:

Install Node JS (preferably version v16.14.2): https://nodejs.org/en/download/
Install NPM (preferably version v8.5.0): https://www.npmjs.com/package/npm
Navigate to the frontend folder from the main project folder using:
cd frontend/finadvice-frontend/
Install all dependencies using:
npm install
Run the frontend using:
npm start


Deployed FinAdvice App: https://silly-frangipane-f9d81d.netlify.app
