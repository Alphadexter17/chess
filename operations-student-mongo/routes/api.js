const express = require('express');
const router = express.Router();
const StudentMark = require('../models/StudentMark');

// Insert array of documents
router.post('/insertMany', async (req, res) => {
  await StudentMark.insertMany(req.body);
  res.json({ success: true });
});

// Count and list all documents
router.get('/all', async (req, res) => {
  const count = await StudentMark.countDocuments();
  const students = await StudentMark.find();
  res.json({ count, students });
});

// List names with DSBDA_Marks > 20
router.get('/dsbda20', async (req, res) => {
  const students = await StudentMark.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
  res.json(students);
});

// Update marks of specified student by 10 (by Roll_No)
router.put('/update/:rollno', async (req, res) => {
  const rollno = req.params.rollno;
  const updated = await StudentMark.findOneAndUpdate(
    { Roll_No: rollno },
    { $inc: {
      WAD_Marks: 10,
      CC_Marks: 10,
      DSBDA_Marks: 10,
      CNS_Marks: 10,
      AI_Marks: 10
    }},
    { new: true }
  );
  res.json(updated);
});

// List names who got more than 25 marks in all subjects
router.get('/all25', async (req, res) => {
  const students = await StudentMark.find({
    WAD_Marks: { $gt: 25 },
    CC_Marks: { $gt: 25 },
    DSBDA_Marks: { $gt: 25 },
    CNS_Marks: { $gt: 25 },
    AI_Marks: { $gt: 25 }
  }, { Name: 1, _id: 0 });
  res.json(students);
});

// List names who got less than 40 in both Maths (WAD) and Science (CNS)
router.get('/maths-science40', async (req, res) => {
  const students = await StudentMark.find({
    WAD_Marks: { $lt: 40 },
    CNS_Marks: { $lt: 40 }
  }, { Name: 1, _id: 0 });
  res.json(students);
});

// Delete specified student by Roll_No
router.delete('/delete/:rollno', async (req, res) => {
  const rollno = req.params.rollno;
  const result = await StudentMark.deleteOne({ Roll_No: rollno });
  res.json({ success: result.deletedCount > 0 });
});

// List all students (for table)
router.get('/table', async (req, res) => {
  const students = await StudentMark.find();
  res.json(students);
});

module.exports = router;
