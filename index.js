require('dotenv').config();

const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database');

app.use(cors());

mongoose.connect(dbConfig.url);
requireDir(dbConfig.modelsPath);

app.use(bodyParser.json());

app.use('/', require('./app/routes'));

app.listen(3000);
