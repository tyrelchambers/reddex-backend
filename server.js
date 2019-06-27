import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';


const database = config[config.env].database;

const db = mongoose.connection;
const app = express();
const port = process.env.PORT || '3001';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

mongoose.connect(database, {useNewUrlParser: true});

db.on('error', console.error.bind(console, "Connection error"));
db.once('open', () => console.log("Connected sucessfully to database"));


app.listen(port, () => console.log("App running on " + port));
