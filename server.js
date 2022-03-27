const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
var session = require('express-session')
const MongoStore = require('connect-mongo');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
const port = 4005;
app.use(session({
  secret: 'JaamaatuuKaTumaaatu',
  name:'sid',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: false},
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/coursestomato', 
})
}))
app.use("/", routes);

async function mongoConnect() {
  await mongoose.connect("mongodb://localhost:27017/coursestomato");
}

mongoConnect()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
app.listen(port, async () => {
  await mongoConnect();
  console.log(`Courses ka tomato foota at ${port}`);
});
