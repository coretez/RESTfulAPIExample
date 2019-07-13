/* eslint-disable no-param-reassign */
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use('/api', bookRouter);

app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
});
