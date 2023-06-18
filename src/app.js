const express = require('express');
const app = express();

const hpp = require('hpp');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routes/users.routes');
const repairRoutes = require('./routes/repairs.routes');
const rateLimit = require('express-rate-limit');
const sanitizer = require('perfect-express-sanitizer');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(
  sanitizer.clean({
    xss: true,
    sql: true,
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', limiter);

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/repairs', repairRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 🧨`, 404)
  );
});

app.use(globalErrorHandler);
module.exports = app;
