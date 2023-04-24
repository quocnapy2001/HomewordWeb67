const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./model/student');

const app = express();

mongoose.connect('mongodb://localhost/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const { name, age, gender } = req.body;
  const student = new Student({ name, age, gender });
  await student.save();
  res.json(student);
});

app.put('/students/:id', async (req, res) => {
  const { name, age, gender } = req.body;
  const student = await Student.findById(req.params.id);
  student.name = name;
  student.age = age;
  student.gender = gender;
  await student.save();
  res.json(student);
});

app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send('Student deleted successfully');
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});