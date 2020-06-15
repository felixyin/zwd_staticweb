const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const listRouter = require('./routes/list');
app.use(/.*\/list.json/, listRouter);

const editRouter = require('./routes/edit');
app.use(/.*\/edit.json/, editRouter);

const removeRouter = require('./routes/remove');
app.use(/.*\/remove.json/, removeRouter);

const addRouter = require('./routes/add');
app.use(/.*\/add.json/, addRouter);

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
