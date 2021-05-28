const express = require("express");
const app = express();
const cors = require('cors');
const listEndpoints = require('express-list-endpoints')
const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'})
console.log(" Secret", process.env.JWT_SECRET, " dir >", __dirname)

app.use(express.json());
app.use(cors())

const session = require('express-session');
// app.use(session({ secret: 'SECRET' }));

// global.__basedir = __dirname;
// const my_config = __dirname.split('/').slice(0,-1).join('/')+'/.env'
// const dotenv = require('dotenv').config({ path: my_config })


const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

require("./users/models/User");
require("./posts/models/Post");

const authRouter = require("./auth/auth.routes");
const usersRouter = require("./users/users.routes");
const postsRouter = require("./posts/posts.routes");


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
app.use("/api/posts", postsRouter);
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
    //printMe(getAppEndpoints(app))
    console.log(printMe(getAppEndpoints(app)))
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

//console.log(getAppRoutes(app) )
function getAppEndpoints (app) {
  try {
    return listEndpoints(app);
  } catch (e) {
    return [];
  }
}
function printMe(routs) {
  let m=  routs.map(a=>a.path)
  let t=  routs.map(a=>a.methods)
  let s=  routs.map(a=>a.middleware)
  let rtn = []
  m.forEach((v, i) => {
    rtn.push(m[i] + "  " + `'          ${t[i]}'` + "  " + s[i])
  })
  return rtn
  // body...
}
//console.log(listEndpoints(app));
 //console.log(app._router.stack.map(r=>r.route).filter(r=>r).map(r=>`${Object.keys(r.methods)} ${r.path}`) )

