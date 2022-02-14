# scarebnb
## React project

ScareBnB is a web application for ghosts in search of the perfect haunted holiday. 
Users can advertise their paranormal property to prospective polterguests, or book their ideal 
haunted house for a ghostly getaway of their own.

Here's how you can launch ScareBnB on your local machine:

### Instructions

#### 1. Clone this repository by running the following command:
```
git clone git@github.com:davidalliger/scarebnb.git
```
#### 2. Navigate into the root directory and install dependencies.
```
npm install
```
#### 3. In psql, create a POSTGRESQL user with PASSWORD and CREATEDB privileges.
```
CREATE USER <username> WITH PASSWORD '<password>'
```
#### 4. Using the .envexample file in the backend folder as a guide, create a .env file 
in the same folder.
#### 5. For the DB_USERNAME and DB_PASSWORD fields, be sure to use the username and password 
that you just created in psql. 
#### 6. Enter the name you would like to use for your database into the DB_DATABASE field.
#### 7. Run the following command in your shell and add the resulting string to the JWT_SECRET field.
```
openssl rand -base64 10
```
#### 8. For JWT_EXPIRES_IN, you can use 604800, the number of seconds in a week.
#### 9. Give DB_HOST a value of localhost.
#### 10. Don't forget to assign a PORT, like 5000.
#### 11. Inside the package.json file in your frontend folder, find the following line and 
replace '5000' with the port you specified in your .env file:
```
"proxy": "http://localhost:5000"
```
#### 12. Create the database using sequelize by running the following command in your backend 
directory:
```
npx dotenv sequelize db:create
```
#### 13. Next run all of the migrations.
```
npx dotenv sequelize db:migrate
```
#### 14. Seed the database with seed data using the provided seeder files.
```
npx dotenv sequelize db:seed:all
```
#### 15. Run ```npm start``` in the backend directory to start the server.
#### 16. Run ```npm start``` in your frontend directory. 
#### 17. If the project doesn't open in your browser automatically, type the following into the
address bar:
```
http://localhost:3000
```
#### 18. You're ready to start using ScareBnB! Sign up for an account or use the conveniently 
provided Demo user login.

#### 19. That's it! Go get your haunt on!

