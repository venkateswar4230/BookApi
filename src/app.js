const express = require('express');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/Book.routes.js');
const Book = require("./models/Book.models.js");
const mongoose = require("mongoose");

const PORT = 5000;

dotenv.config();
const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Middleware
app.use(express.json());

// const seedBooks = async () => {
 
//   await Book.deleteMany();

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


//   await Book.insertMany(books);
//   console.log("Seed data inserted!");
//   // mongoose.connection.close();
// };
// seedBooks();


// Routes

app.use(bookRoutes);
app.get("/", (req, res) => 
  { res.redirect("/api/books"); 
    
  });

// Start server

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

