const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger.json');
const cors = require('cors');

// Load env variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Express session 
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'librarysecret',
    resave: false,
    saveUninitialized: true
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// API Routes 
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));
app.use('/users', require('./routes/users'));
app.use('/loans', require('./routes/loans'));
// app.use('/auth', require('./routes/auth')); 

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
