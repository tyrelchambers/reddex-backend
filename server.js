import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import register from './api/auth/register';
import profile from './api/profile/profile';
import login from './api/auth/login';
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
import dashboard from './api/dashboard/index'

require('dotenv').config();

const app = express();
app.use(helmet())

const database = config[config.env].database;

const db = mongoose.connection;
const port = process.env.PORT || '3001';
app.use(express.static('helpers'))
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());
app.use(cors());
app.use(morgan('combined'));
console.log()

mongoose.connect(database, {useNewUrlParser: true});

db.on('error', console.error.bind(console, "Connection error"));
db.once('open', () => console.log("Connected sucessfully to database"));

app.use('/api/auth/', register);
app.use('/api/profile', [profile, saveAuthors, stories]);
app.use('/api/auth/', login);
app.use('/api/tokens', tokens);
app.use('/api/contacts', contact);
app.use('/api/site', site);
app.use('/api/upload', upload);
app.use('/api/submissionForm', submissionForm);
app.use('/api/reset', resetPassword);
app.use('/api/dashboard', dashboard);

app.listen(port, () => console.log("App running on " + port));
