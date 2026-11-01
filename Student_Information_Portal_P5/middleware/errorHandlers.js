function notFoundHandler(req, res, next) {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: `The page "${req.originalUrl}" does not exist. Check the URL and try again.`
  });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack || err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).render('error', {
    title: err.status === 400 ? 'Bad Request' : 'Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong. Please try again later.'
      : (err.message || 'An unexpected error occurred.')
  });
}

module.exports = { notFoundHandler, errorHandler };
