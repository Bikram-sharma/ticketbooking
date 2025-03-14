const usersRouter = require('./users');
const registerRouter = require('./register')

const app = require('express').Router();

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use('/users', usersRouter);
app.use('/register',registerRouter )

module.exports = app