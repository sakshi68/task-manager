const mongoose = require('mongoose')

const sakshi =  new mongoose.Schema({
  name:String,
  age:Number,
  adult:Boolean,
});

module.exports = mongoose.model('adult', sakshi);