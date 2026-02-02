const express = require('express');
const router = express.Router();

const { createBook } = require('../controllers/createBook.Controllers.js');
const { getBooks } = require('../controllers/getBook.Controllers.js');

router.route('/Books').get(getBooks);
router.route('/create').post(createBook);


module.exports = router;

