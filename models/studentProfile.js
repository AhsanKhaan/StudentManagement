const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  experince: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experince'
    },
  ],
  education: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Education'
    },
  ],
  currentJob: {
    type: String,
    default: 'Open to work!',
  },
  profileStatus: {
    type: String,
    enum: ['PENDING_APPROVAL', 'REJECTED', 'ACTIVE', 'INACTIVE'],
    default: 'PENDING_APPROVAL',
  },
  profileRemarks:{
    type: String,
    default:''
  }
},{timestamps:true});

const studentProfile = mongoose.model('StudentProfile', studentProfileSchema);

module.exports = studentProfile;