const mongoose = require('mongoose');

const education = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  school:{
        type: String,
        required: true
    },
  degree:{
        type: String,
        required: false
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

const Education = mongoose.model('Education', education);

module.exports = Education;