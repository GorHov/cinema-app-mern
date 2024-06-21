const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const roomRoutes = require('./routes/roomRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/rooms', roomRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', bookingRoutes);

module.exports = app;
