# post-ops

A boilerplate that implements Google, Mail.ru, Github, Facebook and classic Authentication. So it can be easy to implement it as a starting point for your projects.

# Idea 
In github you can find a lot similar boilerplate projects to fast start from scratch but only a few with client side on Vue. If You prefer Vue for a frontend than this boilerplate is best choice at this moment.

**Frontend**

In the root folder You will find the frontend classic vue (+vuetify) project.
This client consists of two areas for authenticated users and guest users. Guests may  be registered in any way they prefer. In member areas authenticated users can view/edit/delete those profile data, see all other members short info. They can post messages ( delete/edit ) and view all published posts by other users. Try to do it in the gh-page example of this repo.

**Backend**

In server folder You will rest-api project based on express.js framework + mongoDB as database. Moongose is selected as ORM. Private endpoints and secure authentification routine based on JWT. Authentication by third party
 providers (OAuth 2.0 ) Google, Github, mailru.. build with assistance passport.js libary as best authentication middleware for Node.js.

# Quick start

No need have deep dive in express.js, passport.js, mongoose, mongodb, jwt or vue to successfully run locally this project. You need do only a few steps 

```sh
git clone git@github.com:Dhruuva/post-ops.git
cd post-ops/server
npm install
cp .env.example .env
```
**MONGO_URI** Specify the connection string  to mongoDB local (mongodb://localhost:27017/databaseName) or cloud instance (mongodb+srv://user:myPassword@MyHost.mqvce.mongodb.net/databaseName?retryWrites=true&w=majority). So poin it in your .env

**Creating an OAuth App**
Create any one in a couple minutes 
- Go on  https://console.cloud.google.com/ 
- Go on  https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app 
- Go on  https://help.mail.ru/developers/oauth/app
- Go on  https://developers.facebook.com/apps 
In all case for creation You need specify two parameters
- Web url for you application, it can be like  `http://127.0.0.1:8080`
- redirect url for callbacks hook it may be for Google `http://localhost:5000/api/auth/google/callback` or
Github `http://localhost:5000/api/auth/github/callback`.
After successful set up You will get ClientID and secret so poin it in your .env
when go to the root folder and type 
```
cd post-ops
npm run srv
```
Server will start and you can test in browser typing http://localhost:5000/api/version

# Client 
I recomend install Vue Cli globaly before next steps https://cli.vuejs.org/guide/installation.html

```
cd post-ops
npm install
cp .env.example .env
```
To ensure all done a proper way run test

```
npm run test:unit
```

in .env file in root folder write
```
VUE_APP_BACKEND_URL=http://localhost:5000/
VUE_APP_NAME=MyAppName 
```
and after type to run client  
```
npm run serve

```
Vue show You client url in your terminal.

# Credits

This project has been largely inspired by two work :
https://github.com/valentinchelle/nodejs-rest-api-boilerplate
https://github.com/madhums/node-express-mongoose-demo

## License

MIT
