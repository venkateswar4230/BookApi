const Book = require('../models/Book.models.js');

exports.createBook = async (req, res) => {
  try {
     
    const {name, description, author} = req.body;

    if(!name || !description || !author) { 
      return res.status(400).json({ error: 'Name, description, and author are required' }); 
     }


    const existingBook = await Book.findOne({ name});
    if (existingBook) {
      return res.status(400).json({ error: 'Book with this name already exists' });
    };
     const newBook = await Book.create(req.body);
    res.status(201).json({ newBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};