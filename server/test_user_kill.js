const mongoose = require("mongoose");
require("./users/models/User");
require("./posts/models/Post");
const User = mongoose.model("User");
const Post = mongoose.model("Post");


// const pkg = require('.././server/package.json');

// const join = require('path').join;
// const models = join(__dirname, 'app/models');

//console.log(models)

global.__basedir = __dirname;
const my_config = __dirname.split('/').slice(0,-1).join('/')+'/.env'
const dotenv = require('dotenv').config({ path: my_config })

const db = process.env.MONGO_URI;
if (process.env.NODE_ENV != "test") {
  // Connect to MongoDB
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
}


function run() {
  User.removeById('109401213f498c70b6086d06').then(result => {
    console.log( 'Ok-->',result)
  }).catch(err => {
     console.log( 'Bad-->',err)
  });

}

run()