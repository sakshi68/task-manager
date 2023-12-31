const mongoose = require('mongoose')

const task = new mongoose.Schema({
  name:{
     type :String,
     required:[true, "enter name please.."],
     maxlength: [20, "length should not excees 20 chracter"],
     trim: true,    
  },
  completed:{
    type:Boolean,
    default:false,
  },
});

module.exports = mongoose.model('Task',task);