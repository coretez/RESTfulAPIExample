/* eslint-disable no-param-reassign */
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('this is a test database');
  const db = mongoose.connect('mongodb://localhost/bookAPI-testdatabase', { useNewUrlParser: true });
} else {
  const db = mongoose.connect('mongodb://localhost/bookAPI-prod', { useNewUrlParser: true });
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.server = app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
});

module.exports = app;
