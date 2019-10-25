'use strict';

const app = require('./src/app');
require('dotenv').config();
const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

// required('./src/app.js').start(process.env.PORT);

app.start(3000);
