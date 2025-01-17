const Student = require('../models/student');

const registerStudent = async (req, res) => {
    try {
      const { studentId, studentName, address, skills, cgpa, password, academicYear } = req.body;
  
      if (!studentId || !studentName || !address || !cgpa || !password || !academicYear) {
        return res.status(400).json({ message: 'All fields are required except skills' });
      }

      const existingStudent = await Student.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({ message: 'Student ID already exists' });
      }
  
      const skillsArray = skills ? skills.split(',') : [];
  
      const student = new Student({
        studentId,
        studentName,
        address,
        skills: skillsArray,
        cgpa,
        password,
        academicYear,
      });
 
      await student.save();
  
      res.status(201).json({ message: 'Student registered successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
module.exports = { registerStudent };
