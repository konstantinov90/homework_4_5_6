// for use import/export
require('babel-register');
const path = require('path');
const open = require('open');

const options = require('../options');

// default options;
let {
    myPath = path.join(__dirname, '../'),
    host = 'localhost',
    port
} = options;

// переопределение порта нужно для heroku
// теперь порядок приоритетов портов такой: 1. через переменную окружения, 2. через options.js, 3. значение по умолчанию
port = process.env.PORT || port;

process.env.ROOT = myPath;

const app = require('../backend/app');

app.listen(port, host, () => {
    // open(`http://${host}:${port}`);
    console.log(`App listening on ${host}:${port}!`);
});
