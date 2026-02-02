# Books API

A simple Node.js + Express + MongoDB API for managing and exploring books.

---

## 🚀 Setup

### Prerequisites
- Node.js (>= 16)
- MongoDB (local or cloud, e.g. MongoDB Atlas)

### Environment Variables

Create a `.env` file in the project root


---

## 🛠️ Installation & Run

```bash
# Install dependencies
npm install

# Seed database with sample books
node app.js

# Start server
npm start

## DB Init

- This project uses MongoDB with Mongoose.

- Schema is defined in src/models/Book.models.js.

- Indexes are automatically created by Mongoose on startup.



# Usage Examples

## Create a Book

POST /books
 Content-Type: application/json
 
  {
     "name": "My Book",
     "description": "A detailed description...",
     "author": "John Doe",
     "publishDate": "2022-01-01" 
        
 }


### Explore Books

GET /books?search=history&author=Bob Harris&from=2019-01-01&to=2023-01-01&sortBy=name&order=asc&page=1&limit=10


### source code 

**model/Book.models.js**

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, maxlength: 2000 },
  author: { type: String, required: true, trim: true },
  publishDate: { type: Date }
}, { timestamps: true });

bookSchema.index({ name: 'text', description: 'text' });
bookSchema.index({ author: 1 });
bookSchema.index({ publishDate: 1 });

module.exports = mongoose.model('Book', bookSchema);



### Controller Function

## 1. createBook.Controllers.js

**controllers\createBook.Controllers.js**

#   const Book = require('../models/Book.models.js');

# exports.createBook = async (req, res) => {
#   try {
     
#     const {name, description, author} = req.body;

#     if(!name || !description || !author) { 
#       return res.status(400).json({ error: 'Name, description, and author are required' }); 
#      }


#     const existingBook = await Book.findOne({ name});
#     if (existingBook) {
#       return res.status(400).json({ error: 'Book with this name already exists' });
#     };
#      const newBook = await Book.create(req.body);
#     res.status(201).json({ newBook });
#   } catch (err) {
#     res.status(400).json({ error: err.message });
#     }
#  };



## 2. getBook.Controllers.js


**controllers\getBook.Controllers.js**

# const Book = require('../models/Book.models.js');

# // Explore Books (Search & Filter)

# exports.getBooks = async (req, res) => {
#   try {
#     const { search, author, from, to, page = 1, limit = 10, sortBy="publishDate", order } = req.query;
    
#     const totalBooks = await Book.countDocuments();

#     let query = {};

#     // Search (case-insensitive substring)
    
#     if (search) {
#       query.$or = [
#         { name: { $regex: search, $options: 'i' } },
#         { description: { $regex: search, $options: 'i' } }
#       ];
#     }

#     // Filter by author
#     if (author) {
#       query.author = { $regex: `^${author}$`, $options: 'i' };
#     }

#     // Filter by publish date range
#     if (from || to) {
#       query.publishDate = {};
#       if (from) query.publishDate.$gte = new Date(from);
#       if (to) query.publishDate.$lte = new Date(to);
#     }

#     // Pagination
#     const skip = (page - 1) * Math.min(limit, 50);

#     // Sorting
  
#   // normalize order: accept 'asc' or 'a' (case-insensitive), default to 'desc'
# const orderNormalized = (order || 'desc').toString().toLowerCase();
# const sortOrder = (orderNormalized === 'asc' || orderNormalized === 'a') ? 1 : -1;

# // validate sortBy
# const validSortFields = ['name', 'author', 'publishDate'];
# const sortField = validSortFields.includes(sortBy) ? sortBy : 'publishDate';
# const sortObject = { [sortField]: sortOrder }; 

  
#     let books = await Book.find(query)
#       .sort( sortObject )
#       .skip(skip)
#       .limit(Math.min(limit, 50))
#       .exec();

#     res.json({ books, page: Number(page), limit: Math.min(limit, 50), totalBooks });
    
#   } catch (err) {
#     res.status(500).json({ error: err.message });
#   }
# };




##### 3. app.js inserting ≥ 15 diverse books (multiple authors, varied dates)


        const mongoose = require('mongoose');
        const dotenv = require('dotenv');
        const Book = require('./src/models/Book');
        const connectDB = require('./src/db/connect');

        dotenv.config();

        const seedBooks = async () => {
        await connectDB(process.env.MONGO_URI);
        await Book.deleteMany();


## dummy Book Data

        //  const books = [
//   { name: "The Silent River", description: "A mystery novel set in a quiet town.", author: "Alice Walker", publishDate: "2018-03-12" },
//   { name: "History of Tomorrow", description: "Exploring future possibilities of humanity.", author: "Bob Harris", publishDate: "2020-07-01" },
//   { name: "Cooking with Love", description: "A cookbook with recipes from around the world.", author: "Carla Gomez", publishDate: "2019-11-20" },
//   { name: "Deep Space", description: "Science fiction adventure across galaxies.", author: "David Lee", publishDate: "2021-01-15" },
//   { name: "Mindful Living", description: "Guide to meditation and mindfulness.", author: "Emma Stone", publishDate: "2017-05-05" },
//   { name: "The Last Kingdom", description: "Historical fiction set in medieval Europe.", author: "Frank Miller", publishDate: "2016-09-30" },
//   { name: "Ocean Secrets", description: "Marine biology insights and discoveries.", author: "Grace Kim", publishDate: "2022-02-10" },
//   { name: "Tech Revolution", description: "Impact of AI and robotics on society.", author: "Henry Clark", publishDate: "2023-06-18" },
//   { name: "Poetry of Dreams", description: "Collection of modern poems.", author: "Isabella Cruz", publishDate: "2015-12-01" },
//   { name: "War and Peace Revisited", description: "Analysis of Tolstoy’s masterpiece.", author: "John Smith", publishDate: "2019-04-14" },
//   { name: "The Hidden Forest", description: "Fantasy tale about magical creatures.", author: "Karen White", publishDate: "2021-09-09" },
//   { name: "Startup Hacks", description: "Tips and tricks for entrepreneurs.", author: "Liam Brown", publishDate: "2020-02-22" },
//   { name: "Ancient Civilizations", description: "Exploring history of Egypt, Rome, and Greece.", author: "Maria Lopez", publishDate: "2018-08-08" },
//   { name: "Digital Nomad Life", description: "Travel and work remotely guide.", author: "Nathan Green", publishDate: "2022-12-12" },
//   { name: "Climate Change Explained", description: "Science behind global warming.", author: "Olivia Johnson", publishDate: "2023-03-03" }
// ];

        await Book.insertMany(books);
        console.log("✅ Seed data inserted!");
        };

        seedBooks();


4. API DESCRIPTION (OPERATION PERFORM USING POSTMAN)

1. GET ALL BOOK (default pagination)

## GET

# http://localhost:5000/books

2. 2. SEARCH BY KEYWORD IN "name" or "description"

## GET

# http://localhost:5000/books?search=history


3. FILTER BY AUTHOR (case-insensitive exact match)

## GET

#  http://localhost:5000/books?author=Bob Harris


4. FILTER  BY PUBLISH DATE RANGE

## GET

# http://localhost:5000/books?from=2019-01-01&to=2021-12-31


5. PAGINATION (page 2, 5 results per page)

## GET
 
 # http://localhost:5000/books?page=2&limit=5

6. SORTING (by name ascending)

## GET

# http://localhost:5000/books?sortBy=name&order=asc

7. COMBINE QUERY (search + filter + date range + sort + pagination)

## GET

# http://localhost:5000/books?search=space&author=David Lee&from=2020-01-01&to=2022-12-31&page=1&limit=10&sortBy=publishDate&order=desc


--------




