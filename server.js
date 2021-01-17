const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors");
const register = require("./api/auth/register");
const profile = require("./api/profile/profile");
const login = require("./api/auth/login");
const default_message = require("./api/default_message/default_message");
const alt_message = require("./api/alt_message/alt_message");
const tokens = require("./api/auth/tokens");
const saveAuthors = require("./api/profile/saveAuthors");
const stories = require("./api/profile/stories");
const contact = require("./api/contact/contact");
const site = require("./api/site/site");
const upload = require("./api/upload/upload");
const submissionForm = require("./api/forms/submissionForm");
const helmet = require("helmet");
const morgan = require("morgan");
const resetPassword = require("./api/auth/resetPassword");
const expressSanitizer = require("express-sanitizer");
const submitted = require("./api/submittedStories/submitted");
const channels = require("./api/channels/channels");
const recently_searched = require("./api/recently_searched/index");
const patreon = require("./api/patreon/patreon");
const tags = require("./api/tags/index");
const tag_story = require("./api/tag_story/index");
require("./db/Models/index");
const posts = require("./api/posts/index");
const config = require("./config");
const mongoose = require("mongoose");

const app = express();
const database = config[config.env].database;
// const db = mongoose.connection;

app.use(helmet());

const port = process.env.PORT || "4000";
app.use(
  bodyParser.json({
    limit: 30000000,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(expressSanitizer());
app.use(cors());
app.use(morgan("combined"));
// mongoose.connect(database, { useNewUrlParser: true });

app.use("/api/auth/", [register, login]);
app.use("/api/profile", [profile, saveAuthors, stories]);
app.use("/api/default_message", default_message);
app.use("/api/alt_message", alt_message);
app.use("/api/tokens", tokens);
app.use("/api/contacts", contact);
app.use("/api/site", site);
app.use("/api/upload", upload);
app.use("/api/submissionForm", submissionForm);
app.use("/api/reset", resetPassword);
app.use("/api/submitted", submitted);
app.use("/api/channels", channels);
app.use("/api/recently_searched", recently_searched);
app.use("/api/patreon", patreon);
app.use("/api/tags", tags);
app.use("/api/tag_story", tag_story);
app.use("/api/posts", posts);

// db.on("error", console.error.bind(console, "Connection error - Mongodb"));
// db.once("open", () => console.log("Connected sucessfully to Mongo database"));

app.use(function (err, req, res, next) {
  console.error(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => console.log("App running on " + port));
