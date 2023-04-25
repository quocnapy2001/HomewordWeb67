const express = require('express');
const router = express.Router();
const fs = require('fs');

const readStudents = () => {
  const data = fs.readFileSync('./students.json');
  return JSON.parse(data);
};

const writeStudents = (students) => {
  const data = JSON.stringify(students);
  fs.writeFileSync('./students.json', data);
};

router.get('/', (req, res) => {
  const students = readStudents().students;
  res.json(students);
});

router.get('/:id', (req, res) => {
  const students = readStudents().students;
  const student = students.find((student) => student.id === req.params.id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

router.post('/', (req, res) => {
  const students = readStudents().students;
  const student = req.body;
  student.id = Date.now().toString();
  students.push(student);
  writeStudents({ students });
  res.json(student);
});

router.put('/:id', (req, res) => {
  const students = readStudents().students;
  const studentIndex = students.findIndex(
    (student) => student.id === req.params.id
  );
  if (studentIndex === -1) {
    res.status(404).send('Student not found');
  } else {
    const student = req.body;
    student.id = req.params.id;
    students[studentIndex] = student;
    writeStudents({ students });
    res.json(student);
  }
});

router.delete('/:id', (req, res) => {
  const students = readStudents().students;
  const studentIndex = students.findIndex(
    (student) => student.id === req.params.id
  );
  if (studentIndex === -1) {
    res.status(404).send('Student not found');
  } else {
    students.splice(studentIndex, 1);
    writeStudents({ students });
    res.send('Student deleted successfully');
  }
});

module.exports = router;