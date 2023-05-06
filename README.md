# milestone-3

## Goals

My goal with this app was to add another way for users to budget and to have easy access to resources that users can read to further make better financial decisions.

## Technologies

### Front End

- React
- Typescript
- Material UI
- Redux/Redux Toolkit
- React Router Dom

### Back End

- Node.js
- Express
- Bcrypt
- Sequelize
- JsonWebToken
- Morgan
- Helmet

### Deployment

- Front End: Vercel
- Back End: AWS

## Links

### [Back End](http://budgetbuddy-env.eba-hjjiskth.us-east-1.elasticbeanstalk.com/user/2)

**You should see a Access Not Granted page when you click on the link above. The purpose of this link is to prove it's existence not to be viewed.**

### [Front End](https://milestone-3-c4uo-git-main-emmanuelurias.vercel.app)

**Does not work if you do not set up a local environment. Whenever you send new data to the server the page will crash when you leave completely and revisit the page the page will work and display the new data.**

## Setting up

- Fork and clone repo
- Make a config folder nested within the server folder and a config.js file within the config folder
- Copy and paste this into your config.js file 
require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DATABASE,
    "host": process.env.RDS_HOSTNAME,
    "port": process.env.RDS_PORT,
    "dialect": "postgres"
  }
}

- Make a .env file within the server folder
- Put this in the env and fill in the variables 

PORT=3005
PG_URI=
JWT_SECRET=youshouldnotbereadingthis
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=

NODE_ENV=development

- Install dependancies using npm i in both the server and client folders
- Run nodemon or node index.js in the server folder
- Run npm run dev in the client folder

Now your app should be up and running

## Bugs

- In vercel when you refresh the page the page will crash, if you revisit the page the problem wil fix itself, but it's verbose to do that everytime you send data to the backend
- AWS backend can't be used with Vercel because Vercel(https) can't make requests to my AWS backend(http), I know this issue is solvable but I ran out of time

