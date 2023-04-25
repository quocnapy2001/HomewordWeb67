const express = require('express');
const bodyParser = require('body-parser');
const studentsRouter = require('./routes/students');

const app = express();

app.use(bodyParser.json());

app.use('/students', studentsRouter);

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000');
});