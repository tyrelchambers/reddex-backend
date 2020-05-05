import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();

import cors from 'cors';
import register from './api/auth/register';
import profile from './api/profile/profile';
import login from './api/auth/login';
import default_message from './api/default_message/default_message'
import alt_message from './api/alt_message/alt_message'
import tokens from './api/auth/tokens';
import saveAuthors from './api/profile/saveAuthors';
import stories from './api/profile/stories';
import contact from './api/contact/contact'
import site from './api/site/site'
import upload from './api/upload/upload'
import submissionForm from './api/forms/submissionForm'
import helmet from 'helmet';
import morgan from 'morgan';
import resetPassword from './api/auth/resetPassword'
import expressSanitizer from 'express-sanitizer'
import submitted from './api/submittedStories/submitted'
import channels from './api/channels/channels'
import recently_searched from './api/recently_searched/index'
import patreon from './api/patreon/patreon'
import tags from './api/tags/index'
import tag_story from './api/tag_story/index'
import models from './db/Models/index'
import posts from './api/posts/index'
import config from './config';
import mongoose from 'mongoose'

const app = express();
const database = config[config.env].database;
const db = mongoose.connection;



app.use(helmet())

const port = process.env.PORT || '3001';
app.use(bodyParser.json({
  limit:30000000
}));

app.use(bodyParser.urlencoded({ 
  extended: true,
}));
app.use(expressSanitizer());
app.use(cors());
app.use(morgan('combined'));
mongoose.connect(database, {useNewUrlParser: true});

app.use('/api/auth/', [register, login]);
app.use('/api/profile', [profile, saveAuthors, stories]);
app.use('/api/default_message', default_message)
app.use('/api/alt_message', alt_message)
app.use('/api/tokens', tokens);
app.use('/api/contacts', contact);
app.use('/api/site', site);
app.use('/api/upload', upload);
app.use('/api/submissionForm', submissionForm);
app.use('/api/reset', resetPassword);
app.use('/api/submitted', submitted)
app.use('/api/channels', channels)
app.use('/api/recently_searched', recently_searched)
app.use('/api/patreon', patreon);
app.use('/api/tags', tags)
app.use('/api/tag_story', tag_story)
app.use('/api/posts', posts);

db.on('error', console.error.bind(console, "Connection error - Mongodb"));
db.once('open', () => console.log("Connected sucessfully to Mongo database"));

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send(err.message)
})

app.listen(port, () => console.log("App running on " + port));
