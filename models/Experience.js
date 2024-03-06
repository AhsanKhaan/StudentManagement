const mongoose = require('mongoose');

const experience = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title:{
        type: String,
        required: true
    },
  companyName:{
        type: String,
        required: true
    },
  location:{
        type: String
    },
  startDate:{
      type: Date,
      required: true
    },
  endDate:{
      type: Date,
      required: true
    }
},{timestamps:true});

const Experience = mongoose.model('Experience', experience);

module.exports = Experience;