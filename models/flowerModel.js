const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flowerSchema = new Schema({
  name: String,
  flower_name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: [String]
});

const Flower = mongoose.model('Flower', flowerSchema);

module.exports = Flower;
