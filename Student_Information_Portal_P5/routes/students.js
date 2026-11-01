const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

// Demo data stored in memory. It resets whenever the server restarts.
let students = [
  { id: 1, name: 'Aarav Sharma', prn: '202401000101', email: 'aarav@example.com', course: 'Computer Engineering', year: 'TY' },
  { id: 2, name: 'Meera Patil', prn: '202401000102', email: 'meera@example.com', course: 'Information Technology', year: 'TY' },
  { id: 3, name: 'Rohan Kulkarni', prn: '202401000103', email: 'rohan@example.com', course: 'Electronics Engineering', year: 'SY' }
];
let nextId = 4;

const studentValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 60 }).withMessage('Name must be between 2 and 60 characters.')
    .matches(/^[A-Za-z][A-Za-z .'-]*$/).withMessage('Name may contain letters, spaces, apostrophes, dots, and hyphens only.'),
  body('prn')
    .trim()
    .isLength({ min: 6, max: 20 }).withMessage('PRN must be between 6 and 20 characters.')
    .matches(/^[A-Za-z0-9-]+$/).withMessage('PRN may contain letters, numbers, and hyphens only.')
    .custom(value => !students.some(s => s.prn.toLowerCase() === value.toLowerCase()))
    .withMessage('This PRN already exists. Enter a unique PRN.'),
  body('email')
    .trim().isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail()
    .custom(value => !students.some(s => s.email.toLowerCase() === value.toLowerCase()))
    .withMessage('This email is already registered.'),
  body('course')
    .trim().isIn(['Computer Engineering', 'Information Technology', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering'])
    .withMessage('Select a valid course.'),
  body('year')
    .trim().isIn(['FY', 'SY', 'TY', 'Final Year'])
    .withMessage('Select a valid academic year.')
];

function renderForm(res, options = {}) {
  res.status(options.status || 200).render('student-form', {
    title: options.title || 'Add Student',
    student: options.student || { name: '', prn: '', email: '', course: 'Computer Engineering', year: 'TY' },
    errors: options.errors || [],
    formAction: '/students',
    isEdit: false
  });
}

// List all students
router.get('/', (req, res) => {
  res.render('students', { title: 'Students', students });
});

// New student form
router.get('/new', (req, res) => renderForm(res));

// Create student with server-side validation
router.post('/', studentValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return renderForm(res, { status: 422, errors: errors.array(), student: req.body });
  }

  const student = {
    id: nextId++,
    name: req.body.name.trim(),
    prn: req.body.prn.trim(),
    email: req.body.email.trim().toLowerCase(),
    course: req.body.course,
    year: req.body.year
  };
  students.push(student);
  res.redirect(`/students/${student.id}?created=1`);
});

// Route parameter with validation
router.get('/:id', [
  param('id').isInt({ min: 1 }).withMessage('Student ID must be a positive integer.')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('error', {
      title: 'Invalid Student ID',
      message: errors.array().map(e => e.msg).join(' ')
    });
  }
  const student = students.find(s => s.id === Number(req.params.id));
  if (!student) {
    return res.status(404).render('error', {
      title: 'Student Not Found',
      message: `No student exists with ID ${req.params.id}.`
    });
  }
  res.render('student-detail', {
    title: student.name,
    student,
    created: req.query.created === '1'
  });
});

module.exports = router;
