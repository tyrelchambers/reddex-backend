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
import dashboard from './api/dashboard/index'

const app = express();

app.use(helmet())

const port = process.env.PORT || '3001';
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());
app.use(cors());
app.use(morgan('combined'));

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
app.use('/api/dashboard', dashboard);

app.listen(port, () => console.log("App running on " + port));
