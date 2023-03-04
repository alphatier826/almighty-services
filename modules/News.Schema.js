const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  news: {
    type: String,
    required: true
  }
});

const News = mongoose.model('news', newsSchema);

module.exports = News;