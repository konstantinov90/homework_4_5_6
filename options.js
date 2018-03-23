const options = {
    myPath: './', // or "/path/path/path/"
    host: 'localhost', // example "127.0.0.100"
    port: 8080,
    timeFormat: "LLLL",
    timeLocale: "ru"
};

// timeFormat и timeLocale реализован через moment.js
// поэтому в этом поле может быть реализован любой формат из этой библиотеки
//
// http://momentjs.com/docs/#/displaying/format/

module.exports = options;
