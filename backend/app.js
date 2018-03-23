const express = require('express');
const app = express();

// routers
import index from './routers/index';

import branchRouter from './routers/branch';
import branchTree from './routers/branchTree';
import branchBlob from './routers/branchBlob';

import commit from './routers/commit';
import commitTree from './routers/commitTree';
import commitBlob from './routers/commitBlob';

import notFound from './routers/notFound';

app.set('view engine', 'pug');
app.set('views', './backend/views');

app.use(express.static('public'));

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
