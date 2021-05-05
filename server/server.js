const express = require("express");
const app = express();
global.__basedir = __dirname;
const my_config = __dirname.split('/').slice(0,-1).join('/')+'/.env'
const dotenv = require('dotenv').config({ path: my_config })

console.log(process.env.MONGO_URI)

// DB Config
const db = process.env.MONGO_URI;
if (process.env.NODE_ENV != "test") {
  // Connect to MongoDB
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
}


app.get("/favicon.ico", (req, res) => {
  res.end();
  console.log("favicon requested");
  return;
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  if (process.env.NODE_ENV != "test") {
    console.log(`Server up and running on port ${port} !`);
  }
});