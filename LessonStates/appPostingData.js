/* eslint-disable no-param-reassign */
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('../models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);
  })
  .get((req, res) => {
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  })
  .put((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();
      return res.json(book);
    });
  });

app.use('/api', bookRouter);

app.listen(port, () => {
  console.log(`Express server started on port: ${port}`);
});
