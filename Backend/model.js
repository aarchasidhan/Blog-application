const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {   // use 'content' instead of 'category'
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Blog", blogSchema);
