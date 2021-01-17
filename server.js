const express = require("express");
const session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var db = require("./models");
const passport = require("./config/passport");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//passport
app.use(
    session({ secret: "placeholder", resave: true, saveUninitialized: true })
  );
  app.use(passport.initialize());
  app.use(passport.session());

// Define API routes here
require("./routes/apiroutes.js")(app);


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });
  