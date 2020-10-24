const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/subscribers');

app.listen(6000, () => console.log('Server is running on port 6000'));
