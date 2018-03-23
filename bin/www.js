// for use import/export
require('babel-register');
const path = require('path');
const open = require('open');

const options = require('../options');

// default options;
const {
    myPath = path.join(__dirname, '../'),
    host = 'localhost',
    port = 8080
} = options;

process.env.ROOT = myPath;

const app = require('../backend/app');

app.listen(port, host, () => {
    // open(`http://${host}:${port}`);
    console.log(`App listening on ${host}:${port}!`);
});
