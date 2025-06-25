// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:5173', 'https://hack-crack.vercel.app/'],
//   credentials: true
// }));

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackcrack_db')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // Routes
// app.use('/api/hackathons', require('./routes/hackathons'));
// app.use('/api', require('./routes/auth'));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://hack-crack.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: Not allowed origin ${origin}`));
    }
  },
  credentials: true
}));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackcrack_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api', require('./routes/auth'));
app.use('/api/contact', require('./routes/contactRoutes')); // Add this line for contact routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
