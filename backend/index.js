const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/user');
const assignmentRoutes = require('./routes/assignment');
require('dotenv').config();
const cors=require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
//============== Connect DB ===============


//============== Routes ===================

app.use('/auth', authRoutes);
app.use('/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
