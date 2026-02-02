const Book = require('../models/Book.models.js');

// Explore Books (Search & Filter)

exports.getBooks = async (req, res) => {
  try {
    const { search, author, from, to, page = 1, limit = 10, sortBy="publishDate", order } = req.query;
    
    const totalBooks = await Book.countDocuments();

    let query = {};

    // Search (case-insensitive substring)
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by author
    if (author) {
      query.author = { $regex: `^${author}$`, $options: 'i' };
    }

    // Filter by publish date range
    if (from || to) {
      query.publishDate = {};
      if (from) query.publishDate.$gte = new Date(from);
      if (to) query.publishDate.$lte = new Date(to);
    }

    // Pagination
    const skip = (page - 1) * Math.min(limit, 50);

    // Sorting
  
  // normalize order: accept 'asc' or 'a' (case-insensitive), default to 'desc'
const orderNormalized = (order || 'desc').toString().toLowerCase();
const sortOrder = (orderNormalized === 'asc' || orderNormalized === 'a') ? 1 : -1;

// validate sortBy
const validSortFields = ['name', 'author', 'publishDate'];
const sortField = validSortFields.includes(sortBy) ? sortBy : 'publishDate';
const sortObject = { [sortField]: sortOrder }; 

  
    let books = await Book.find(query)
      .sort( sortObject )
      .skip(skip)
      .limit(Math.min(limit, 50))
      .exec();

    res.json({ books, page: Number(page), limit: Math.min(limit, 50), totalBooks });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};