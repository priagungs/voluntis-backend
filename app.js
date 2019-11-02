var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var accidentRouter = require('./routes/accidents');
var accidentPointRouter = require('./routes/accidentPoints')

const authMiddleware = require('./middlewares/auth');

const uploader = require('./middlewares/uploader');

const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/safira'
mongoose.connect(dbUri)

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/accidents', authMiddleware, accidentRouter);
app.use('/accident-points', authMiddleware, accidentPointRouter);
app.post('/files', authMiddleware, uploader.single('file'), (req, res) => {
    res.send({
        status: 200,
        message: 'Success',
        data: {
            url: 'http://10.10.6.209:3000/' + req.file.destination + '/' + req.file.filename
        }
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
})

module.exports = app;
