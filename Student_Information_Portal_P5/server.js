const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const studentRoutes = require('./routes/students');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

// Template engine and built-in middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Third-party middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));

// Custom request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Home and informational routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Student Information Portal' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About | Student Portal' });
});

// Express Router
app.use('/students', studentRoutes);

// 404 and centralized error-handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Student Portal running on port ${PORT}`);
});
