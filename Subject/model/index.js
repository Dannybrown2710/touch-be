var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  // var SubjectSchema = new Schema({
  //   name: {
  //     type: String,
  //     required: [true, "Item name not provided "],
  //   },
  //   // category: {
  //   //   type: String,
  //   //   lowercase: true,
  //   //   trim: true,
  //   //   required: [true, "Category not provided"]
  
  //   // },
  //   image: {
  //     type: String,
  //     required: [true, "Please add a phone number"]
  //   },
  //   price: {
  //     type: Number,
  //     required: true
  //   },
  //   created: {
  //     type: Date,
  //     default: Date.now
  //   }
  // });


/**
 * Teacher Schema
 */
var SubjectSchema = new Schema({
  name: {
    type: String,
    unique: [true, "email already exists in database!"],
    required: [true, "Subject name not provided "],
  },
  // address: {
  //   type: String,
  //   unique: [true, "Address already exists in database!"],
  //   lowercase: true,
  //   trim: true,
  //   required: [true, "Address not provided"]

  // },
  // phone: {
  //   type: String,
  //   required: [true, "Please add a phone number"]
  // },
  // image: {
  //   type: String,
  //   required: true
  // },
  created: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: String,
    required: true,
  },
  links:{
    type: [String],
    default: []
  },
  students:{
    type: [String],
    default: []
  },
});

module.exports = mongoose.model('Subject', SubjectSchema);