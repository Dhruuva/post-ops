const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors())

const session = require('express-session');
app.use(session({ secret: 'SECRET' }));

global.__basedir = __dirname;
const my_config = __dirname.split('/').slice(0,-1).join('/')+'/.env'
const dotenv = require('dotenv').config({ path: my_config })

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./users//models/User");

const authRouter = require("./auth/auth.routes");
const usersRouter = require("./users/users.routes");
console.log(process.env.MONGO_URI)

// DB Config
const db = process.env.MONGO_URI;
if (process.env.NODE_ENV != "test") {
  // Connect to MongoDB
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
}

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
// Bodyparser middleware

// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
// app.use(bodyParser.json());

app.get("/favicon.ico", (req, res) => {
  res.end();
  console.log("favicon requested");
  return;
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  if (process.env.NODE_ENV != "test") {
    console.log(`Server up and running on port ${port} !`);
   // console.log(app._router.stack.map(r=>r.route).filter(r=>r).map(r=>`${Object.keys(r.methods)}${r.path}`) )
  }
});

const getAppRoutes = (app) => app._router.stack.reduce(
  (acc, val) => acc.concat(
    val.route ? [val.route.path] :
      val.name === "router" ? val.handle.stack.filter(
        x => x.route).map(
          x => val.regexp.toString().match(/\/[a-z]+/)[0] + (
            x.route.path === '/' ? '' : ` ${x.route.path} ${Object.keys(x.route.methods).join(' +') } `)) : []) , []).sort();

console.log(getAppRoutes(app) )
 console.log(app._router.stack.map(r=>r.route).filter(r=>r).map(r=>`${Object.keys(r.methods)} ${r.path}`) )

