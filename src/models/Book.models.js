const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Indexes for performance
bookSchema.index({ name: "text", description: "text" });
bookSchema.index({ author: 1 });
bookSchema.index({ publishDate: 1 });

module.exports = mongoose.model("Book", bookSchema);
