const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // Array of skills
    required: false,
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  academicYear: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

StudentSchema.pre('save', async function(next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = mongoose.model('Student', StudentSchema);