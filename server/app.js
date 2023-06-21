
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const boardRoutes = require('./routes/boardRoutes');
const userRoutes = require('./routes/userRoutes');



require('dotenv').config();


mongoose.connect('mongodb://127.0.0.1:27017/G960_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));



const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/boards', boardRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
