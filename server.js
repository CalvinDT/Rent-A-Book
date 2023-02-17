const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Allows us access to our DB 
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
})

app.use(express.static("client/build"));

// API and View routes
app.use(routes);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/mern-starter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database.");
  })
  .catch((err) => {
    console.log("Unable to connect to database.");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});