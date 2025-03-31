const express = require('express')
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes)

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
  });