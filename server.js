import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import register from './api/auth/register';
import profile from './api/profile/profile';
import login from './api/auth/login';
import tokens from './api/auth/tokens';
import invites from './api/invites/invites';
import createInvite from './api/invites/createInvite';
import saveAuthors from './api/profile/saveAuthors';
import stories from './api/profile/stories';
import approval from './api/approval/approval';
import contact from './api/contact/contact'
import site from './api/site/site'

require('dotenv').config();

const database = config[config.env].database;

const db = mongoose.connection;
const app = express();
const port = process.env.PORT || '3001';
app.use(express.static('helpers'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

mongoose.connect(database, {useNewUrlParser: true});

db.on('error', console.error.bind(console, "Connection error"));
db.once('open', () => console.log("Connected sucessfully to database"));

app.use('/api/auth/', register);
app.use('/api/profile', [profile, saveAuthors, stories]);
app.use('/api/auth/', login);
app.use('/api/tokens', tokens);
app.use('/api/invites', [invites, createInvite]);
app.use('/api/approval', approval);
app.use('/api/contacts', contact);
app.use('/api/site', site);

app.listen(port, () => console.log("App running on " + port));
