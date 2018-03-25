const express = require('express');
const app = express();
const favicon = require('express-favicon');

// routers
const index = require('./routers/index');

const branchRouter = require('./routers/branch');
const branchTree = require('./routers/branchTree');
const branchBlob = require('./routers/branchBlob');

const commit = require('./routers/commit');
const commitTree = require('./routers/commitTree');
const commitBlob = require('./routers/commitBlob');

const notFound = require('./routers/notFound');

app.set('view engine', 'pug');
app.set('views', './backend/views');

app.use(express.static('public'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', index);

app.get('/notFound', (req, res) => {
    res.send('NOT FOUND');
});

app.get('/commit/:hash', commit);
app.get('/commit/:hash/tree/*', commitTree);
app.get('/commit/:hash/blob/*', commitBlob);

app.get('/:branch', branchRouter);
app.get('/:branch/tree/*', branchTree);
app.get('/:branch/blob/*', branchBlob);

// для не найденных путей
app.get('*', notFound);

module.exports = app;
